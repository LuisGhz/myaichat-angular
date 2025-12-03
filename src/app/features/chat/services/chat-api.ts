import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http-base.service';
import { ChatStreamEvent, SendMessageReqModel } from '@chat/models';
import { UserChatsModel } from '@chat/models/chat.model';
import { dispatch } from '@ngxs/store';
import { ChatActions } from '@st/chat/chat.actions';
import { Message } from '@st/chat/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatApi extends HttpService {
  #loadMessages = dispatch(ChatActions.LoadMessages);

  async loadMessages(chatId: string) {
    const res = await this.getP<Message[]>('/chat/' + chatId + '/messages');
    this.#loadMessages(res);
  }

  getChats() {
    return this.getP<UserChatsModel[]>('/chat');
  }

  sendMessage(content: string) {
    return this.ssePost<ChatStreamEvent, SendMessageReqModel>('/chat/openai', {
      message: content,
      model: 'gpt-4o-mini',
      maxTokens: 1000,
    });
  }
}
