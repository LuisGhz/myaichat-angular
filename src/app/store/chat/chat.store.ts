import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ChatStoreModel } from './models/chat.store.model';
import { ChatActions } from './chat.actions';
import { FileStoreService } from './services';

@Injectable()
@State<ChatStoreModel>({
  name: 'chat',
  defaults: {
    messages: [],
    model: '',
    maxTokens: 2048,
    temperature: 0.7,
    file: undefined,
  },
})
export class ChatStore {
  #fileStore = inject(FileStoreService);

  @Action(ChatActions.ResetChat)
  resetChat(ctx: StateContext<ChatStoreModel>) {
    ctx.setState({
      messages: [],
      model: '',
      maxTokens: 1024,
      temperature: 0.5,
      file: undefined,
    });
    this.#fileStore.clear();
  }

  @Action(ChatActions.SetOps)
  setOps(ctx: StateContext<ChatStoreModel>, { payload }: ChatActions.SetOps) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      ...payload,
    });
  }

  @Action(ChatActions.AddUserMessage)
  addUserMessage(ctx: StateContext<ChatStoreModel>, { payload, file }: ChatActions.AddUserMessage) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      messages: [...state.messages, { role: 'user', content: payload, file }],
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

  @Action(ChatActions.LoadMessages)
  loadMessages(ctx: StateContext<ChatStoreModel>, { payload }: ChatActions.LoadMessages) {
    ctx.setState({
      ...ctx.getState(),
      messages: payload,
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

  @Action(ChatActions.RemoveFile)
  removeFile(ctx: StateContext<ChatStoreModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      file: undefined,
    });
  }

  @Selector()
  static getOps(state: ChatStoreModel) {
    return {
      model: state.model,
      maxTokens: state.maxTokens,
      temperature: state.temperature,
      file: state.file,
    };
  }

  @Selector()
  static getMessages(state: ChatStoreModel) {
    return state.messages;
  }
}
