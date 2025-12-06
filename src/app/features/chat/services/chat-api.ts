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

  renameChat(chatId: string, newTitle: string) {
    return this.patchP('/chat/' + chatId + '/rename', {
      title: newTitle,
    });
  }

  sendMessage(req: SendMessageReqModel) {
    const formData = new FormData();
    formData.append('message', req.message);
    formData.append('model', req.model);
    formData.append('maxTokens', req.maxTokens.toString());
    formData.append('temperature', req.temperature.toString());
    if (req.chatId) {
      formData.append('chatId', req.chatId);
    }
    if (req.file) {
      formData.append('file', req.file, req.file.name);
    }
    return this.ssePost<ChatStreamEvent>('/chat/openai', formData);
  }
}
