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
        content: 'Hello! How can I use this AI chat application?',
        inputTokens: 80,
      },
      {
        role: 'assistant',
        content:
          'Hi there! To use this AI chat application, simply type your message in the input box and hit send. The AI will respond to your queries based on the context of the conversation.',
        outputTokens: 95,
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

  @Action(ChatActions.AddAssistantMessage)
  addAssistantMessage(
    ctx: StateContext<ChatStoreModel>,
    { payload }: ChatActions.AddAssistantMessage,
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      messages: [...state.messages, { role: 'assistant', content: payload }],
    });
  }

  @Action(ChatActions.AddAssistantChunk)
  addAssistantChunk(ctx: StateContext<ChatStoreModel>, { payload }: ChatActions.AddAssistantChunk) {
    const state = ctx.getState();
    const messages = [...state.messages];
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant') {
      lastMessage.content += payload;
      messages[messages.length - 1] = lastMessage;
    }
    ctx.setState({
      ...state,
      messages,
    });
  }

  @Action(ChatActions.SetMessagesMetadata)
  setMessagesMetadata(
    ctx: StateContext<ChatStoreModel>,
    { payload }: ChatActions.SetMessagesMetadata,
  ) {
    const state = ctx.getState();
    const messages = [...state.messages];

    // Set inputTokens on last user message
    if (payload.inputTokens !== undefined) {
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].role === 'user') {
          messages[i] = { ...messages[i], inputTokens: payload.inputTokens };
          break;
        }
      }
    }

    // Set outputTokens on last assistant message
    if (payload.outputTokens !== undefined) {
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].role === 'assistant') {
          messages[i] = { ...messages[i], outputTokens: payload.outputTokens };
          break;
        }
      }
    }

    ctx.setState({
      ...state,
      messages,
    });
  }

  @Selector()
  static getMessages(state: ChatStoreModel) {
    return state.messages;
  }
}
