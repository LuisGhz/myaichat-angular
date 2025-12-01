import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { dispatch, select } from '@ngxs/store';
import { AuthActions } from '@st/auth/auth.actions';
import { AuthStore } from '@st/auth/auth.store';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = select(AuthStore.token);
  const uploadToken = dispatch(AuthActions.UploadToken);
  const logoutFromRequest = dispatch(AuthActions.LogoutFromRequest);
  const router = inject(Router);

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token()}`,
      },
      withCredentials: true,
    });
    req = clonedReq;
  }

  return next(req).pipe(
    tap((response) => {
      if (response instanceof HttpResponse) {
        const newToken = response.headers.get('x-new-access-token');
        if (newToken) {
          uploadToken({ token: newToken });
        }
      }
      if (response instanceof HttpResponse && response.status === 401) {
        logoutFromRequest();
        router.navigate(['/auth/login']);
      }
    }),
  );
};
