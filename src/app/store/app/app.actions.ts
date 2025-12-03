export namespace AppActions {
  const type = '[App]';

  export class ToggleSidebar {
    static readonly type = `${type} Toggle Sidebar`;
  }

  export class SelectChat {
    static readonly type = `${type} Select Chat`;
    constructor(public payload: string | null) {}
  }
}
