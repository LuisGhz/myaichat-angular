import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthStoreModel } from './models';
import { AuthActions } from './auth.actions';
import { Injectable } from '@angular/core';

@State<AuthStoreModel>({
  name: 'auth',
  defaults: {
    isAuthenticated: false,
    token: null,
  },
})
@Injectable()
export class AuthStore {
  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStoreModel>, action: AuthActions.Login) {
    ctx.setState({
      isAuthenticated: true,
      token: action.payload.token,
    });
  }

  @Selector()
  static isAuthenticated(state: AuthStoreModel): boolean {
    return state.isAuthenticated;
  }
}
