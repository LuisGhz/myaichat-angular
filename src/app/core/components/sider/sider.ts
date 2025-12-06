import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { Router, RouterLink, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzInputModule } from 'ng-zorro-antd/input';
import { dispatch, select } from '@ngxs/store';
import { AuthStore } from '@st/auth/auth.store';
import { AppStore } from '@st/app/app.store';
import { AppActions } from '@st/app/app.actions';
import { ChatApi } from '@chat/services/chat-api';
import { More } from '../more/more';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { RenameChatModal } from '@chat/modals/rename-chat-modal/rename-chat-modal';

@Component({
  selector: 'app-sider',
  imports: [
    FormsModule,
    RouterLink,
    NzButtonModule,
    NzIconModule,
    NzTooltipDirective,
    NzMenuModule,
    NzAvatarModule,
    NzSkeletonModule,
    NzInputModule,
    NzIconModule,
    More,
    NzModalModule,
    RenameChatModal,
  ],
  templateUrl: './sider.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sider implements OnInit {
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  #chatApi = inject(ChatApi);
  #updateUserChats = dispatch(AppActions.UpdateUserChats);
  userEmail = select(AuthStore.email);
  sidebarCollapsed = select(AppStore.sidebarCollapsed);
  #toggleSidebar = dispatch(AppActions.ToggleSidebar);
  #deleteChat = dispatch(AppActions.DeleteChat);
  searchQuery = signal('');
  chatsResource = resource({
    loader: () => this.#chatApi.getChats(),
  });
  #userChats = select(AppStore.userChats);
  filteredChats = computed(() => {
    const chats = this.#userChats() ?? [];
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return chats;
    return chats.filter((chat) => chat.title?.toLowerCase().includes(query));
  });
  isDeleteChatModalVisible = signal(false);
  chatIdToDelete = signal<string | null>(null);
  #modalService = inject(NzModalService);
  chatIdToRename = signal<string | null>(null);
  isRenameChatModalVisible = signal(false);
  chatTitleToRename = signal<string | null>(null);
  #renameChat = dispatch(AppActions.RenameChat);
  #currentChatId: string | null = null;

  constructor() {
    effect(() => {
      this.#updateUserChats(this.chatsResource.value() ?? []);
    });
  }

  ngOnInit(): void {
    this.#router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
      )
      .subscribe(() => {
        let route = this.#activatedRoute.root;
        while (route.firstChild) {
          route = route.firstChild;
        }
        this.#currentChatId = route.snapshot.paramMap.get('id');
      });
  }

  onToggleSidebar(): void {
    this.#toggleSidebar();
  }

  onNavigateToPrompts(): void {
    this.#router.navigate(['/prompts']);
  }

  onDeleteChatConfirmed(chatId: string): void {
    this.#modalService.confirm({
      nzTitle: 'Are you sure you want to delete this chat?',
      nzOkText: 'Delete',
      nzOnOk: async () => {
        const originalChats = this.#userChats();
        try {
          await this.#chatApi.deleteChat(chatId);
          this.#deleteChat(chatId);
          if (this.#currentChatId === chatId) await this.#router.navigateByUrl('/');
        } catch (error) {
          this.#updateUserChats(originalChats);
        }
      },
      nzOnCancel: () => {},
    });
  }

  onRenameChat(chatId: string): void {
    this.chatIdToRename.set(chatId);
    this.isRenameChatModalVisible.set(true);
    const chat = this.#userChats().find((c) => c.id === chatId)!;
    this.chatTitleToRename.set(chat.title!);
  }

  async onSaveRename(newTitle: string): Promise<void> {
    const chatId = this.chatIdToRename();
    if (chatId) {
      this.#renameChat({ chatId, newTitle });
      try {
        await this.#chatApi.renameChat(chatId, newTitle);
      } catch {
        this.#renameChat({ chatId, newTitle: this.chatTitleToRename()! });
      }
    }
    this.isRenameChatModalVisible.set(false);
    this.chatIdToRename.set(null);
    this.chatTitleToRename.set(null);
  }

  onCancelRename(): void {
    this.isRenameChatModalVisible.set(false);
  }
}
