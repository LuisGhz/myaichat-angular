
export namespace AuthActions {
  const type = '[Auth]';

  export class Login {
    static readonly type = `${type} Login`;
    constructor(public payload: { token: string }) {}
  }

}
