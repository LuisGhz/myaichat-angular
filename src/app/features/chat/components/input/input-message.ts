import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dispatch } from '@ngxs/store';
import { ChatActions } from '@st/chat/chat.actions';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-input-message',
  imports: [FormsModule, NzInputModule, NzIconModule],
  templateUrl: './input-message.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMessage {
  #addUserMessage = dispatch(ChatActions.AddUserMessage);
  protected messageText = signal('');

  onSend(): void {
    if (this.messageText().trim()) {
      console.log('Sending:', this.messageText());
      this.#addUserMessage(this.messageText().trim());
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
