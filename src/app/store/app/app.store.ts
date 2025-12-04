import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AppStoreModel } from './models';
import { AppActions } from './app.actions';
import { ChatApi } from '@chat/services/chat-api';
import { UserChatsModel } from '@chat/models/chat.model';

@State<AppStoreModel>({
  name: 'app',
  defaults: {
    sidebarCollapsed: false,
    selectedChatId: null,
    userChats: [],
  },
})
@Injectable()
export class AppStore {
  #chatApi = inject(ChatApi);
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

  @Action(AppActions.UpdateUserChats)
  updateUserChats(ctx: StateContext<AppStoreModel>, { payload }: AppActions.UpdateUserChats) {
    ctx.patchState({
      userChats: payload,
    });
  }

  @Action(AppActions.DeleteChat)
  deleteChat(ctx: StateContext<AppStoreModel>, { payload }: AppActions.DeleteChat) {
    const state = ctx.getState();
    ctx.patchState({
      userChats: state.userChats.filter((chat) => chat.id !== payload),
    });
  }

  @Action(AppActions.RenameChat)
  renameChat(ctx: StateContext<AppStoreModel>, { payload }: AppActions.RenameChat) {
    const state = ctx.getState();
    ctx.patchState({
      userChats: state.userChats.map((chat) =>
        chat.id === payload.chatId ? { ...chat, title: payload.newTitle } : chat,
      ),
    });
  }

  @Selector()
  static userChats(state: AppStoreModel): UserChatsModel[] {
    return state.userChats || [];
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
