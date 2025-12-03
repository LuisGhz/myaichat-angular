import { inject, Injectable } from '@angular/core';
import { ChatApi } from './chat-api';
import { ChatActions } from '@st/chat/chat.actions';
import { dispatch, select } from '@ngxs/store';
import { ChatStore } from '@st/chat/chat.store';

@Injectable({
  providedIn: 'any',
})
export class MessagesHandler {
  #chatApi = inject(ChatApi);
  #messages = select(ChatStore.getMessages);
  #addUserMessage = dispatch(ChatActions.AddUserMessage);
  #addAssistantMessage = dispatch(ChatActions.AddAssistantMessage);
  #addAssistantChunk = dispatch(ChatActions.AddAssistantChunk);
  #setMessagesMetadata = dispatch(ChatActions.SetMessagesMetadata);

  handleUserMessage(message: string): void {
    this.#addUserMessage(message);
    this.#chatApi.sendMessage(message).subscribe((r) => {
      if (r.type === 'delta') this.#addAssistantMsg(r.data || '');
      if (r.type === 'done') {
        this.#setMessagesMetadata({
          inputTokens: r.data.inputTokens,
          outputTokens: r.data.outputTokens,
        });
      }
    });
  }

  #addAssistantMsg(message: string): void {
    if (this.#messages()[this.#messages().length - 1]?.role !== 'assistant') {
      this.#addAssistantMessage(message);
      return;
    }
    this.#addAssistantChunk(message);
  }
}
