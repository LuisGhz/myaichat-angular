import { Component, inject, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { Sider } from './core/components/sider/sider';
import { Header } from './core/components/header/header';
import { dispatch, select } from '@ngxs/store';
import { AuthStore } from '@st/auth/auth.store';
import { AppStore } from '@st/app/app.store';
import { AppActions } from '@st/app/app.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzLayoutModule, Sider, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly sidebarCollapsed = select(AppStore.sidebarCollapsed);
  readonly isAuthenticated = select(AuthStore.isAuthenticated);
  readonly #collapse = dispatch(AppActions.CollapseSidebar);
  readonly #uncollapse = dispatch(AppActions.UnCollapseSidebar);
  readonly #breakpointObserver = inject(BreakpointObserver);
  readonly #setIsMobile = dispatch(AppActions.SetIsMobile);
  readonly #mobileQuery = '(max-width: 991px)';
  collapsedWidth = signal(60);

  ngOnInit(): void {
    this.#breakpointObserver.observe([this.#mobileQuery]).subscribe((state) => {
      if (state.matches) {
        this.collapsedWidth.set(0);
        this.#collapse();
        this.#setIsMobile(true);
      } else {
        this.#uncollapse();
        this.collapsedWidth.set(60);
        this.#setIsMobile(false);
      }
    });
  }
}
