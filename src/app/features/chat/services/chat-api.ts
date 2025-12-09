import { Injectable } from '@angular/core';
import { HttpBaseService } from '@core/services';
import type { PromptItemSummaryResModel, TranscribeAudioResModel } from '@chat/models';
import { UserChatsModel } from '@chat/models/chat.model';
import { dispatch } from '@ngxs/store';
import { ChatActions } from '@st/chat/chat.actions';
import { MessagesHistoryModel } from '@st/chat/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatApi extends HttpBaseService {
  #loadMessages = dispatch(ChatActions.LoadMessages);
  #setOps = dispatch(ChatActions.SetOps);

  async loadMessages(chatId: string) {
    const res = await this.getP<MessagesHistoryModel>('/chat/' + chatId + '/messages');
    this.#loadMessages(res);
    this.#setOps({ maxTokens: res.maxTokens, temperature: res.temperature });
  }

  loadOlderMessages(chatId: string, beforeMessageId: string) {
    return this.getP<MessagesHistoryModel>(
      `/chat/${chatId}/messages?beforeMessageId=${beforeMessageId}`,
    );
  }

  getChats() {
    return this.getP<UserChatsModel[]>('/chat');
  }

  getPrompts() {
    return this.getP<PromptItemSummaryResModel[]>('/prompts/summary');
  }

  deleteChat(chatId: string) {
    return this.deleteP('/chat/' + chatId);
  }

  renameChat(chatId: string, newTitle: string) {
    return this.patchP('/chat/' + chatId + '/rename', {
      title: newTitle,
    });
  }

  updateMaxTokens(chatId: string, maxTokens: number) {
    return this.patchP(`/chat/${chatId}/update-max-tokens`, { maxTokens });
  }

  updateTemperature(chatId: string, temperature: number) {
    return this.patchP(`/chat/${chatId}/update-temperature`, { temperature });
  }

  transcribe(file: Blob) {
    const formData = new FormData();
    formData.append('audio', file);
    return this.postP<TranscribeAudioResModel, FormData>('/chat/transcribe', formData);
  }
}
