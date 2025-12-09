import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  linkedSignal,
  OnInit,
  resource,
  signal,
  viewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { InputMessage } from '@chat/components/input/input-message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AiModelsApi } from '@chat/services/ai-models-api';
import { AiModelModel } from '@chat/models';
import { dispatch, select } from '@ngxs/store';
import { ChatStore } from '@st/chat/chat.store';
import { Messages } from '@chat/components/messages/messages';
import { ChatApi } from '@chat/services/chat-api';
import { ActivatedRoute } from '@angular/router';
import { ChatActions } from '@st/chat/chat.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AppStore } from '@st/app/app.store';

@Component({
  selector: 'app-chat-view',
  imports: [FormsModule, NzSelectModule, InputMessage, Messages],
  templateUrl: './chat-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage implements OnInit, AfterViewInit {
  messagesContainer = viewChild<ElementRef<HTMLElement>>('messagesContainer');
  #activatedRoute = inject(ActivatedRoute);
  #chatApi = inject(ChatApi);
  #destroyRef = inject(DestroyRef);
  #aiModelsApi = inject(AiModelsApi);
  #resetChat = dispatch(ChatActions.ResetChat);
  #setOps = dispatch(ChatActions.SetOps);
  #setCurrentChatId = dispatch(ChatActions.SetCurrentChatId);
  #prependMessages = dispatch(ChatActions.PrependMessages);
  #setIsLoadingOlderMessages = dispatch(ChatActions.SetIsLoadingOlderMessages);
  #userChats = select(AppStore.userChats);
  #title = inject(Title);
  messages = select(ChatStore.getMessages);
  hasMoreMessages = select(ChatStore.hasMoreMessages);
  isLoadingOlderMessages = select(ChatStore.isLoadingOlderMessages);

  #isLoadedChat = signal(false);
  shouldAnimateTransition = computed(() => !this.#isLoadedChat());

  models = resource({
    loader: () => this.#aiModelsApi.getAiModels(),
    defaultValue: [],
  });

  prompts = resource({
    loader: () => this.#chatApi.getPrompts(),
    defaultValue: [],
  });

  selectedModel = linkedSignal(() => {
    const models = this.models.value();
    return models.length > 0 ? models[0].id : null;
  });

  selectedPrompt = signal<string | null>(null);

  groupedModels = computed(() => {
    const modelList = this.models.value();
    const grouped = new Map<string, AiModelModel[]>();

    modelList.forEach((model) => {
      const developerName = model.developer.name;
      if (!grouped.has(developerName)) {
        grouped.set(developerName, []);
      }
      grouped.get(developerName)!.push(model);
    });

    return grouped;
  });

  constructor() {
    effect(() => {
      const modelId = this.selectedModel();
      const model = this.models.value().find((m) => m.id === modelId);
      if (model)
        this.#setOps({
          model: model.value,
        });
    });

    effect(() => {
      const promptId = this.selectedPrompt();
      this.#setOps({
        promptId: promptId || undefined,
      });
    });

    effect(() => {
      if (this.messages().length > 0 && this.messages()[this.messages().length - 1].role === 'user')
        setTimeout(() => {
          this.#scrollToBottom();
        }, 100);
    });
  }

  ngOnInit(): void {
    this.#activatedRoute.params.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((params) => {
      const chatId = params['id'];
      if (chatId) {
        this.#isLoadedChat.set(true);
        this.#setCurrentChatId(chatId);
        this.#chatApi.loadMessages(chatId);
        this.#setChatTitle(chatId);
      } else {
        this.#isLoadedChat.set(false);
        this.#setCurrentChatId(null);
        this.#resetChat();
        this.#setChatTitle(null);
      }
      this.#scrollToBottom();
    });
  }

  #setChatTitle(currentChatId: string | null): void {
    if (currentChatId === null) {
      this.#title.setTitle('New Chat');
      return;
    }

    const currentChat = this.#userChats().find((chat) => chat.id === currentChatId);
    if (!currentChatId) return;
    const title = currentChat ? currentChat.title : 'New Chat';
    this.#title.setTitle(title!);
  }

  ngAfterViewInit(): void {
    this.#scrollToBottom();
    this.#setupScrollListener();
  }

  #scrollToBottom(): void {
    setTimeout(() => {
      this.messagesContainer()?.nativeElement.scrollTo({
        top: this.messagesContainer()!.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 250);
  }

  #setupScrollListener(): void {
    const container = this.messagesContainer()?.nativeElement;
    if (!container) return;

    fromEvent(container, 'scroll')
      .pipe(debounceTime(100), takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.#onScroll();
      });
  }

  #onScroll(): void {
    const container = this.messagesContainer()?.nativeElement;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const threshold = 50;

    if (
      scrollTop <= threshold &&
      this.hasMoreMessages() &&
      !this.isLoadingOlderMessages() &&
      this.messages().length > 0
    ) {
      this.#loadOlderMessages();
    }
  }

  async #loadOlderMessages(): Promise<void> {
    const currentChatId = this.#activatedRoute.snapshot.params['id'];
    if (!currentChatId) return;

    const oldestMessage = this.messages()[0];
    if (!oldestMessage?.id) return;

    const container = this.messagesContainer()?.nativeElement;
    if (!container) return;

    const previousScrollHeight = container.scrollHeight;

    this.#setIsLoadingOlderMessages(true);

    try {
      const result = await this.#chatApi.loadOlderMessages(currentChatId, oldestMessage.id);
      this.#prependMessages({
        messages: result.messages,
        hasMore: result.hasMore,
      });

      setTimeout(() => {
        const newScrollHeight = container.scrollHeight;
        const scrollDifference = newScrollHeight - previousScrollHeight;
        container.scrollTop = scrollDifference;
      }, 0);
    } catch (error) {
      console.error('Error loading older messages:', error);
    } finally {
      this.#setIsLoadingOlderMessages(false);
    }
  }
}
