export namespace ChatActions {
  const preffix = '[Chat]';

  export class ResetChat {
    static readonly type = `${preffix} Reset Chat`;
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
