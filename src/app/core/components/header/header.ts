import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { dispatch, select } from '@ngxs/store';
import { AppStore } from '@st/app/app.store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AppActions } from '@st/app/app.actions';

@Component({
  selector: 'app-header',
  imports: [CommonModule, NzIconModule],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  #title = inject(Title);
  #router = inject(Router);
  headerTitle = signal('');
  unCollapseSideNav = dispatch(AppActions.UnCollapseSidebar);
  isCollapsed = select(AppStore.sidebarCollapsed);
  isMobile = select(AppStore.isMobile);

  ngOnInit(): void {
    this.#router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      setTimeout(() => {
        this.headerTitle.set(this.#title.getTitle());
      }, 150);
    });

    setTimeout(() => {
      this.headerTitle.set(this.#title.getTitle());
    }, 1000);
  }
}
