import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagesHandler } from '@chat/services/message-handler';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-input-message',
  imports: [FormsModule, NzInputModule, NzIconModule],
  templateUrl: './input-message.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMessage {
  #messagesHandler = inject(MessagesHandler);
  protected messageText = signal('');

  onSend(): void {
    if (this.messageText().trim()) {
      this.#messagesHandler.handleUserMessage(this.messageText().trim());
      this.messageText.set('');
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }
}
