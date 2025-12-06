import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessagesHandler } from '@chat/services/message-handler';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { MoreOptions } from '../more-options/more-options';
import { FilePreview } from '../file-preview/file-preview';
import { select, dispatch } from '@ngxs/store';
import { ChatStore } from '@st/chat/chat.store';
import { ChatActions } from '@st/chat/chat.actions';
import { EnabledOptions } from '../enabled-options/enabled-options';

@Component({
  selector: 'app-input-message',
  imports: [FormsModule, NzInputModule, NzIconModule, MoreOptions, FilePreview, EnabledOptions],
  templateUrl: './input-message.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMessage implements OnInit {
  #messagesHandler = inject(MessagesHandler);
  #activatedRoute = inject(ActivatedRoute);
  file = select(ChatStore.getOps)().file;
  #destroyRef = inject(DestroyRef);
  #dispatch = dispatch(ChatActions.SetMessageText);
  chatId: string | undefined = undefined;
  messageText = select(ChatStore.getMessageText);

  ngOnInit(): void {
    this.#activatedRoute.params.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((params) => {
      this.chatId = params['id'];
    });
  }

  onMessageTextChange(value: string): void {
    this.#dispatch(value);
  }

  onSend(): void {
    if (this.messageText().trim()) {
      this.#messagesHandler.handleUserMessage(this.messageText().trim(), this.chatId);
      this.#dispatch('');
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }
}
