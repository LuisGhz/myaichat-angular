import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  linkedSignal,
  OnInit,
  resource,
  signal,
} from '@angular/core';
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

@Component({
  selector: 'app-chat-view',
  imports: [FormsModule, NzSelectModule, InputMessage, Messages],
  templateUrl: './chat-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage implements OnInit {
  #activatedRoute = inject(ActivatedRoute);
  #chatApi = inject(ChatApi);
  #destroyRef = inject(DestroyRef);
  #aiModelsApi = inject(AiModelsApi);
  #resetChat = dispatch(ChatActions.ResetChat);
  #setOps = dispatch(ChatActions.SetOps);
  #setCurrentChatId = dispatch(ChatActions.SetCurrentChatId);
  messages = select(ChatStore.getMessages);

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
  }

  ngOnInit(): void {
    this.#activatedRoute.params.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((params) => {
      const chatId = params['id'];
      if (chatId) {
        this.#isLoadedChat.set(true);
        this.#setCurrentChatId(chatId);
        this.#chatApi.loadMessages(chatId);
      } else {
        this.#isLoadedChat.set(false);
        this.#setCurrentChatId(null);
        this.#resetChat();
      }
    });
  }
}
