import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [NzButtonModule, NzAlertModule, NzIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  #route = inject(ActivatedRoute);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.#route.queryParams.subscribe((params) => {
      if (params['errorMessage']) this.errorMessage.set(params['errorMessage']);
    });
  }

  loginWithGithub(): void {
    const loginUrl = `${environment.apiUrl}/auth/login`;
    console.log('Redirecting to:', loginUrl);
    window.location.href = loginUrl;
  }

  clearError(): void {
    this.errorMessage.set(null);
  }
}
