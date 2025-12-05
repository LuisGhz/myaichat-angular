import { inject, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ChatApi } from './chat-api';
import { ChatActions } from '@st/chat/chat.actions';
import { dispatch, select } from '@ngxs/store';
import { ChatStore } from '@st/chat/chat.store';

@Injectable({
  providedIn: 'any',
})
export class MessagesHandler {
  #chatApi = inject(ChatApi);
  #location = inject(Location);
  #messages = select(ChatStore.getMessages);
  #addUserMessage = dispatch(ChatActions.AddUserMessage);
  #addAssistantMessage = dispatch(ChatActions.AddAssistantMessage);
  #addAssistantChunk = dispatch(ChatActions.AddAssistantChunk);
  #setMessagesMetadata = dispatch(ChatActions.SetMessagesMetadata);
  #chatOps = select(ChatStore.getOps);

  handleUserMessage(message: string, chatId?: string): void {
    this.#addUserMessage(message);
    const ops = this.#chatOps();
    this.#chatApi.sendMessage({
      message,
      chatId,
      ...ops,
    }).subscribe((r) => {
      if (r.type === 'delta') this.#addAssistantMsg(r.data || '');
      if (r.type === 'done') {
        this.#setMessagesMetadata({
          inputTokens: r.data.inputTokens,
          outputTokens: r.data.outputTokens,
        });
        this.#updateUrlIfNewChat(r.data.chatId);
      }
    });
  }

  #updateUrlIfNewChat(chatId: string): void {
    if (!this.#location.path().includes(chatId)) {
      this.#location.replaceState(`/chat/${chatId}`);
    }
  }

  #addAssistantMsg(message: string): void {
    if (this.#messages()[this.#messages().length - 1]?.role !== 'assistant') {
      this.#addAssistantMessage(message);
      return;
    }
    this.#addAssistantChunk(message);
  }
}
