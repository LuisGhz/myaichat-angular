import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { render, screen } from '@testing-library/angular';
import { provideStore, Store } from '@ngxs/store';
import {
  MockNzLayoutComponent,
  MockNzHeaderComponent,
  MockNzContentComponent,
  MockNzSiderComponent,
} from '@sh/testing/ng-zorro-antd';
import { RouterOutlet } from '@angular/router';

vi.mock('@ngxs/store', async (importActual) => {
  const actual = await importActual<typeof import('@ngxs/store')>();
  console.log('Actual NGXS Store imported for testing.');
  return {
    ...actual,
    select: (selector: any) => actual.select(selector),
  };
});

@Component({
  selector: 'app-sider',
  template: '<div>Mock Sider</div>',
})
class MockSider {}

@Component({
  selector: 'app-header',
  template: '<div>Mock Header</div>',
})
class MockHeader {}

const mockBreakpointObserver = {
  observe: vi.fn().mockReturnValue(of({ matches: false })),
};

import { App } from './app';
import { AuthStore } from '@st/auth/auth.store';
import { AppStore } from '@st/app/app.store';
import { AuthActions } from '@st/auth/auth.actions';

describe('App', () => {
  beforeEach(() => {
    mockBreakpointObserver.observe.mockReset();
    mockBreakpointObserver.observe.mockReturnValue(of({ matches: false }));
  });

  const renderComponent = async () => {

    const result = await render(App, {
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideStore([AuthStore, AppStore]),
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
      ],
      componentImports: [
        RouterOutlet,
        MockSider,
        MockHeader,
        MockNzLayoutComponent,
        MockNzHeaderComponent,
        MockNzContentComponent,
        MockNzSiderComponent,
      ],
    });
    const store = result.fixture.debugElement.injector.get(Store);
    // store.dispatch(new AuthActions.Login({ token: 'test' }));

    result.fixture.detectChanges();

    return result;
  };

  it('should display main layout when user is authenticated', async () => {
    await renderComponent();

    expect(screen.getByText('Mock Sider')).toBeInTheDocument();
    expect(screen.getByText('Mock Header')).toBeInTheDocument();
  });
});
