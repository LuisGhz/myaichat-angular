import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ChatStoreModel } from './models/chat.store.model';
import { ChatActions } from './chat.actions';

@Injectable()
@State<ChatStoreModel>({
  name: 'chat',
  defaults: {
    messages: [
      {
        role: 'user',
        content: 'Hello!',
        inputTokens: 1024,
      },
      {
        role: 'assistant',
        content: 'Hello! How can I assist you today?',
        inputTokens: 1024,
      },
    ],
    model: '',
    maxTokens: 2048,
    temperature: 0.7,
  },
})
export class ChatStore {
  @Action(ChatActions.ResetChat)
  resetChat(ctx: StateContext<ChatStoreModel>) {
    ctx.setState({
      messages: [],
      model: '',
      maxTokens: 2048,
      temperature: 0.7,
    });
  }

  @Action(ChatActions.AddUserMessage)
  addUserMessage(ctx: StateContext<ChatStoreModel>, { payload }: ChatActions.AddUserMessage) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      messages: [...state.messages, { role: 'user', content: payload }],
    });
  }

  @Selector()
  static getMessages(state: ChatStoreModel) {
    return state.messages;
  }
}
