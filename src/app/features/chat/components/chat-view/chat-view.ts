import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LayoutService } from '../../../../core/services/layout.service';

@Component({
  selector: 'app-chat-view',
  imports: [FormsModule, NzButtonModule, NzIconModule, NzInputModule],
  templateUrl: './chat-view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatView {
  protected readonly layoutService = inject(LayoutService);
  protected messageText = '';

  onSend(): void {
    if (this.messageText.trim()) {
      console.log('Sending:', this.messageText);
      this.messageText = '';
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }
}
