import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { Sider } from './core/components/sider/sider';
import { Header } from './core/components/header/header';
import { LayoutService } from './core/services/layout.service';
import { select } from '@ngxs/store';
import { AuthStore } from '@st/auth/auth.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzLayoutModule, Sider, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly layoutService = inject(LayoutService);
  isAuthenticated = select(AuthStore.isAuthenticated);
}
