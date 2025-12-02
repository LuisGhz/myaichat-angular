export namespace ChatActions {
  const preffix = '[Chat]';

  export class ResetChat {
    static readonly type = `${preffix} Reset Chat`;
  }

  export class AddUserMessage {
    static readonly type = `${preffix} Add User Message`;
    constructor(public payload: string) {}
  }
}
