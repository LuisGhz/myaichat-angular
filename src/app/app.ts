import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
export class App implements OnInit {
  protected readonly layoutService = inject(LayoutService);
  #router = inject(Router);
  isAuthenticated = select(AuthStore.isAuthenticated);

  ngOnInit(): void {
    if (!this.isAuthenticated()) this.#router.navigate(['/auth/login']);
  }
}
