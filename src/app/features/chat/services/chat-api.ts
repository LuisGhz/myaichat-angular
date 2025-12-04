import { Injectable } from '@angular/core';
import { HttpBaseService } from '@core/services';
import { ChatStreamEvent, SendMessageReqModel } from '@chat/models';
import { UserChatsModel } from '@chat/models/chat.model';
import { dispatch } from '@ngxs/store';
import { ChatActions } from '@st/chat/chat.actions';
import { Message } from '@st/chat/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatApi extends HttpBaseService {
  #loadMessages = dispatch(ChatActions.LoadMessages);

  async loadMessages(chatId: string) {
    const res = await this.getP<Message[]>('/chat/' + chatId + '/messages');
    this.#loadMessages(res);
  }

  getChats() {
    return this.getP<UserChatsModel[]>('/chat');
  }

  deleteChat(chatId: string) {
    return this.deleteP('/chat/' + chatId);
  }

  sendMessage({ message, maxTokens, model, chatId }: SendMessageReqModel) {
    return this.ssePost<ChatStreamEvent, SendMessageReqModel>('/chat/openai', {
      message,
      model,
      maxTokens,
      chatId,
    });
  }
}
