import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AppStoreModel } from './models';
import { AppActions } from './app.actions';

@State<AppStoreModel>({
  name: 'app',
  defaults: {
    sidebarCollapsed: false,
    selectedChatId: null,
  },
})
@Injectable()
export class AppStore {
  @Action(AppActions.ToggleSidebar)
  toggleSidebar(ctx: StateContext<AppStoreModel>) {
    const state = ctx.getState();
    ctx.patchState({
      sidebarCollapsed: !state.sidebarCollapsed,
    });
  }

  @Action(AppActions.SelectChat)
  selectChat(ctx: StateContext<AppStoreModel>, { payload }: AppActions.SelectChat) {
    ctx.patchState({
      selectedChatId: payload,
    });
  }

  @Selector()
  static sidebarCollapsed(state: AppStoreModel): boolean {
    return state.sidebarCollapsed;
  }

  @Selector()
  static selectedChatId(state: AppStoreModel): string | null {
    return state.selectedChatId;
  }
}
