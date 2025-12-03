import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http-base.service';
import { ChatStreamEvent, SendMessageReqModel } from '@chat/models';

@Injectable({
  providedIn: 'root',
})
export class ChatApi extends HttpService {
  sendMessage(content: string) {
    return this.ssePost<ChatStreamEvent, SendMessageReqModel>('/chat/openai', {
      message: content,
      model: 'gpt-4o-mini',
      maxTokens: 1000,
    });
  }
}
