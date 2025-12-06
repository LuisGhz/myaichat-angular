import { inject, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ChatApi } from './chat-api';
import { ChatActions } from '@st/chat/chat.actions';
import { dispatch, select } from '@ngxs/store';
import { ChatStore } from '@st/chat/chat.store';
import { FileStoreService } from '@st/chat/services/file-store.service';

@Injectable({
  providedIn: 'any',
})
export class MessagesHandler {
  #chatApi = inject(ChatApi);
  #location = inject(Location);
  #fileStore = inject(FileStoreService);
  #removeFile = dispatch(ChatActions.RemoveFile);
  #messages = select(ChatStore.getMessages);
  #addUserMessage = dispatch(ChatActions.AddUserMessage);
  #addAssistantMessage = dispatch(ChatActions.AddAssistantMessage);
  #addAssistantChunk = dispatch(ChatActions.AddAssistantChunk);
  #setMessagesMetadata = dispatch(ChatActions.SetMessagesMetadata);
  #chatOps = select(ChatStore.getOps);

  handleUserMessage(message: string, chatId?: string): void {
    const ops = this.#chatOps();
    const file = ops.file ? this.#fileStore.getFile(ops.file.id) : undefined;
    this.#addUserMessage(message, file);
    this.#removeFile();
    this.#chatApi
      .sendMessage({
        message,
        chatId,
        model: ops.model,
        maxTokens: ops.maxTokens,
        temperature: ops.temperature,
        isImageGeneration: ops.isImageGeneration,
        isWebSearch: ops.isWebSearch,
        file,
      })
      .subscribe((r) => {
        this.#fileStore.clear();
        if (r.type === 'delta') this.#addAssistantMsg(r.data || '');
        if (r.type === 'done') {
          this.#setMessagesMetadata({
            inputTokens: r.data.inputTokens,
            outputTokens: r.data.outputTokens,
          });
          this.#updateUrlIfNewChat(r.data.chatId);
          if (r.data.imageUrl) {
            this.#addAssistantMsg('', r.data.imageUrl);
          }
        }
      });
  }

  #updateUrlIfNewChat(chatId: string): void {
    if (!this.#location.path().includes(chatId)) {
      this.#location.replaceState(`/chat/${chatId}`);
    }
  }

  #addAssistantMsg(message: string, imageUrl?: string): void {
    if (this.#messages()[this.#messages().length - 1]?.role !== 'assistant') {
      this.#addAssistantMessage(message);
      return;
    }
    this.#addAssistantChunk({
      content: message,
      imageUrl,
    });
  }
}
