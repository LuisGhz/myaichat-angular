import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessagesHandler } from '@chat/services/message-handler';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-input-message',
  imports: [FormsModule, NzInputModule, NzIconModule],
  templateUrl: './input-message.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMessage implements OnInit {
  #messagesHandler = inject(MessagesHandler);
  #activatedRoute = inject(ActivatedRoute);
  #destroyRef = inject(DestroyRef);
  chatId: string | undefined = undefined;
  messageText = signal('');

  ngOnInit(): void {
    this.#activatedRoute.params.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((params) => {
      this.chatId = params['id'];
      console.log('Chat ID en InputMessage:', this.chatId);
    });
  }

  onSend(): void {
    if (this.messageText().trim()) {
      this.#messagesHandler.handleUserMessage(this.messageText().trim(), this.chatId);
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
