import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LayoutService } from '../../services/layout.service';
import { select } from '@ngxs/store';
import { AuthStore } from '@st/auth/auth.store';
import { ChatApi } from '@chat/services/chat-api';

@Component({
  selector: 'app-sider',
  imports: [
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzTooltipDirective,
    NzDropDownModule,
    NzMenuModule,
    NzAvatarModule,
    NzSkeletonModule,
    NzInputModule,
    NzIconModule,
  ],
  templateUrl: './sider.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sider {
  readonly #router = inject(Router);
  readonly #chatApi = inject(ChatApi);
  userEmail = select(AuthStore.email);
  protected readonly layoutService = inject(LayoutService);
  protected readonly searchQuery = signal('');
  protected readonly chatsResource = resource({
    loader: () => this.#chatApi.getChats(),
  });
  protected readonly filteredChats = computed(() => {
    const chats = this.chatsResource.value() ?? [];
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return chats;
    return chats.filter((chat) => chat.title?.toLowerCase().includes(query));
  });

  onNewChat(): void {
    this.layoutService.selectChat(null);
  }

  onSelectChat(chatId: string): void {
    this.layoutService.selectChat(chatId);
  }

  onNavigateToPrompts(): void {
    this.#router.navigate(['/prompts']);
  }
}
