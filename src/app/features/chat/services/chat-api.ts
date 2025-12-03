import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http-base.service';
import { ChatStreamEvent, SendMessageReqModel } from '@chat/models';
import { UserChatsModel } from '@chat/models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatApi extends HttpService {
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
