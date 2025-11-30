import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { LayoutService } from '../../services/layout.service';
import { ChatGroupModel } from '../../../features/chat/models';
import { select } from '@ngxs/store';
import { AuthStore } from '@st/auth/auth.store';

@Component({
  selector: 'app-sider',
  imports: [
    NzButtonModule,
    NzIconModule,
    NzToolTipModule,
    NzDropDownModule,
    NzMenuModule,
    NzAvatarModule,
  ],
  templateUrl: './sider.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sider {
  userEmail = select(AuthStore.email);
  protected readonly layoutService = inject(LayoutService);
  protected readonly chatGroups = signal<ChatGroupModel[]>([
    {
      label: 'Today',
      chats: [
        { id: '1', title: 'How caching works...', messages: [], createdAt: new Date(), updatedAt: new Date() },
        { id: '2', title: 'Expected response question', messages: [], createdAt: new Date(), updatedAt: new Date() },
      ],
    },
    {
      label: 'Yesterday',
      chats: [
        { id: '3', title: 'YouTube app technologies', messages: [], createdAt: new Date(), updatedAt: new Date() },
        { id: '4', title: 'Bubble explanation', messages: [], createdAt: new Date(), updatedAt: new Date() },
        { id: '5', title: 'Image processing cost...', messages: [], createdAt: new Date(), updatedAt: new Date() },
      ],
    },
    {
      label: 'Previous 7 days',
      chats: [
        { id: '6', title: 'DTO test template', messages: [], createdAt: new Date(), updatedAt: new Date() },
        { id: '7', title: 'E2E tests with NestJS', messages: [], createdAt: new Date(), updatedAt: new Date() },
        { id: '8', title: 'React Vitest testing steps', messages: [], createdAt: new Date(), updatedAt: new Date() },
        { id: '9', title: 'Unit test prompt nestjs', messages: [], createdAt: new Date(), updatedAt: new Date() },
        { id: '10', title: 'Supported file extensions...', messages: [], createdAt: new Date(), updatedAt: new Date() },
        { id: '11', title: 'Create app icon', messages: [], createdAt: new Date(), updatedAt: new Date() },
        { id: '12', title: 'Tourette syndrome explana...', messages: [], createdAt: new Date(), updatedAt: new Date() },
        { id: '13', title: 'API differences explained', messages: [], createdAt: new Date(), updatedAt: new Date() },
        { id: '14', title: 'Spanish Mexico option', messages: [], createdAt: new Date(), updatedAt: new Date() },
        { id: '15', title: 'Credit card interest calc', messages: [], createdAt: new Date(), updatedAt: new Date() },
      ],
    },
  ]);

  onNewChat(): void {
    this.layoutService.selectChat(null);
  }

  onSelectChat(chatId: string): void {
    this.layoutService.selectChat(chatId);
  }
}
