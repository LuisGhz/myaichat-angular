import { ChatStoreOps, Message } from './models';

export namespace ChatActions {
  const preffix = '[Chat]';

  export class ResetChat {
    static readonly type = `${preffix} Reset Chat`;
  }

  export class SetOps {
    static readonly type = `${preffix} Set Ops`;
    constructor(public payload: ChatStoreOps) {}
  }

  export class LoadMessages {
    static readonly type = `${preffix} Load Messages`;
    constructor(public payload: Message[]) {}
  }

  export class AddUserMessage {
    static readonly type = `${preffix} Add User Message`;
    constructor(public payload: string) {}
  }

  export class AddAssistantMessage {
    static readonly type = `${preffix} Add Assistant Message`;
    constructor(public payload: string) {}
  }

  export class AddAssistantChunk {
    static readonly type = `${preffix} Add Assistant Chunk`;
    constructor(public payload: string) {}
  }

  export class SetMessagesMetadata {
    static readonly type = `${preffix} Set Messages Metadata`;
    constructor(public payload: { inputTokens?: number; outputTokens?: number }) {}
  }
}
