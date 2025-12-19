import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/angular';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { provideStore, Store } from '@ngxs/store';
import { AppStore } from '@st/app/app.store';
import { AuthStore } from '@st/auth/auth.store';
import { ChatStore } from '@st/chat/chat.store';
import { AuthActions } from '@st/auth/auth.actions';
import { App } from './app';
import {
  MockNzLayoutComponent,
  MockNzHeaderComponent,
  MockNzContentComponent,
  MockNzSiderComponent,
} from '@sh/testing/ng-zorro-antd/modules.mock';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sider',
  template: '<div data-testid="sider">Mock Sider</div>',
})
class MockSiderComponent {}

@Component({
  selector: 'app-header',
  template: '<div data-testid="header">Mock Header</div>',
})
class MockHeaderComponent {}

@Component({
  selector: 'router-outlet',
  template: '<div data-testid="router-outlet">Mock Router Outlet</div>',
})
class MockRouterOutletComponent {}

describe('App', () => {
  let breakpointSubject: Subject<any>;
  let mockBreakpointObserver: { observe: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    breakpointSubject = new Subject();
    mockBreakpointObserver = {
      observe: vi.fn().mockReturnValue(breakpointSubject.asObservable()),
    };
  });

  const renderComponent = async () => {
    return await render(App, {
      providers: [
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
        provideStore([AppStore, AuthStore, ChatStore]),
        provideZonelessChangeDetection(),
        provideHttpClient(),
      ],
      imports: [
        MockNzLayoutComponent,
        MockNzHeaderComponent,
        MockNzContentComponent,
        MockNzSiderComponent,
        MockSiderComponent,
        MockHeaderComponent,
        MockRouterOutletComponent,
      ],
    });
  };

  describe('Authentication States', () => {
    it('should show only router-outlet when user is not authenticated', async () => {
      const { fixture } = await renderComponent();
      const store = fixture.debugElement.injector.get(Store);

      // User is not authenticated (default state)
      expect(screen.queryByTestId('sider')).not.toBeInTheDocument();
      expect(screen.queryByTestId('header')).not.toBeInTheDocument();
      expect(screen.getByTestId('router-outlet')).toBeInTheDocument();
    });

    // it('should show full layout when user logs in', async () => {
    //   const { fixture } = await renderComponent();
    //   const store = fixture.debugElement.injector.get(Store);

    //   // Simulate user login
    //   store.dispatch(new AuthActions.Login({ token: 'mock-token' }));
    //   fixture.detectChanges();

    //   await waitFor(() => {
    //     expect(screen.getByTestId('sider')).toBeInTheDocument();
    //     expect(screen.getByTestId('header')).toBeInTheDocument();
    //     expect(screen.getByTestId('router-outlet')).toBeInTheDocument();
    //   });
    // });

    // it('should hide layout when user logs out', async () => {
    //   const { fixture } = await renderComponent();
    //   const store = fixture.debugElement.injector.get(Store);

    //   // Simulate user login first
    //   store.dispatch(new AuthActions.Login({ token: 'mock-token' }));
    //   fixture.detectChanges();

    //   await waitFor(() => {
    //     expect(screen.getByTestId('sider')).toBeInTheDocument();
    //   });

    //   // Simulate user logout
    //   store.dispatch(new AuthActions.Logout());
    //   fixture.detectChanges();

    //   await waitFor(() => {
    //     expect(screen.queryByTestId('sider')).not.toBeInTheDocument();
    //     expect(screen.queryByTestId('header')).not.toBeInTheDocument();
    //     expect(screen.getByTestId('router-outlet')).toBeInTheDocument();
    //   });
    // });
  });

  // describe('Responsive Behavior', () => {
  //   it('should collapse sidebar and set mobile mode when viewport is mobile', async () => {
  //     const { fixture } = await renderComponent();
  //     const store = fixture.debugElement.injector.get(Store);

  //     // User logs in first
  //     store.dispatch(new AuthActions.Login({ token: 'mock-token' }));
  //     fixture.detectChanges();

  //     // Simulate mobile viewport
  //     breakpointSubject.next({ matches: true, breakpoints: { '(max-width: 991px)': true } });
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       const state = store.selectSnapshot(AppStore);
  //       expect(state.sidebarCollapsed).toBe(true);
  //       expect(state.isMobile).toBe(true);
  //     });
  //   });

  //   it('should uncollapse sidebar and disable mobile mode when viewport is desktop', async () => {
  //     const { fixture } = await renderComponent();
  //     const store = fixture.debugElement.injector.get(Store);

  //     // User logs in
  //     store.dispatch(new AuthActions.Login({ token: 'mock-token' }));
  //     fixture.detectChanges();

  //     // First simulate mobile
  //     breakpointSubject.next({ matches: true, breakpoints: { '(max-width: 991px)': true } });
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       const state = store.selectSnapshot(AppStore);
  //       expect(state.sidebarCollapsed).toBe(true);
  //     });

  //     // Then switch to desktop
  //     breakpointSubject.next({ matches: false, breakpoints: { '(max-width: 991px)': false } });
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       const state = store.selectSnapshot(AppStore);
  //       expect(state.sidebarCollapsed).toBe(false);
  //       expect(state.isMobile).toBe(false);
  //     });
  //   });

  //   it('should set collapsedWidth to 0 on mobile and 60 on desktop', async () => {
  //     const { fixture, debugElement } = await renderComponent();
  //     const store = fixture.debugElement.injector.get(Store);
  //     const component = debugElement.componentInstance as App;

  //     // User logs in
  //     store.dispatch(new AuthActions.Login({ token: 'mock-token' }));
  //     fixture.detectChanges();

  //     // Simulate mobile viewport
  //     breakpointSubject.next({ matches: true });
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       expect(component.collapsedWidth()).toBe(0);
  //       expect(component.isMobile()).toBe(true);
  //     });

  //     // Switch to desktop
  //     breakpointSubject.next({ matches: false });
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       expect(component.collapsedWidth()).toBe(60);
  //       expect(component.isMobile()).toBe(false);
  //     });
  //   });
  // });

  // describe('Sidebar Interactions', () => {
  //   it('should show backdrop on mobile when sidebar is open', async () => {
  //     const { fixture, container } = await renderComponent();
  //     const store = fixture.debugElement.injector.get(Store);

  //     // User logs in
  //     store.dispatch(new AuthActions.Login({ token: 'mock-token' }));
  //     fixture.detectChanges();

  //     // Set mobile viewport
  //     breakpointSubject.next({ matches: true });
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       const state = store.selectSnapshot(AppStore);
  //       expect(state.isMobile).toBe(true);
  //       expect(state.sidebarCollapsed).toBe(true);
  //     });

  //     // User opens sidebar
  //     store.dispatch(new AppActions.UnCollapseSidebar());
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       const backdrop = container.querySelector('.bg-black\\/35');
  //       expect(backdrop).toBeInTheDocument();
  //     });
  //   });

  //   it('should close sidebar when clicking backdrop on mobile', async () => {
  //     const { fixture, container } = await renderComponent();
  //     const store = fixture.debugElement.injector.get(Store);
  //     const user = userEvent.setup();

  //     // User logs in
  //     store.dispatch(new AuthActions.Login({ token: 'mock-token' }));
  //     fixture.detectChanges();

  //     // Set mobile viewport
  //     breakpointSubject.next({ matches: true });
  //     fixture.detectChanges();

  //     // User opens sidebar
  //     store.dispatch(new AppActions.UnCollapseSidebar());
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       const state = store.selectSnapshot(AppStore);
  //       expect(state.sidebarCollapsed).toBe(false);
  //     });

  //     // Click backdrop
  //     const backdrop = container.querySelector('.bg-black\\/35') as HTMLElement;
  //     expect(backdrop).toBeInTheDocument();
  //     await user.click(backdrop);
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       const state = store.selectSnapshot(AppStore);
  //       expect(state.sidebarCollapsed).toBe(true);
  //     });
  //   });

  //   it('should not show backdrop on desktop even when sidebar is open', async () => {
  //     const { fixture, container } = await renderComponent();
  //     const store = fixture.debugElement.injector.get(Store);

  //     // User logs in
  //     store.dispatch(new AuthActions.Login({ token: 'mock-token' }));
  //     fixture.detectChanges();

  //     // Set desktop viewport
  //     breakpointSubject.next({ matches: false });
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       const state = store.selectSnapshot(AppStore);
  //       expect(state.isMobile).toBe(false);
  //       expect(state.sidebarCollapsed).toBe(false);
  //     });

  //     // Backdrop should not be visible
  //     const backdrop = container.querySelector('.bg-black\\/35');
  //     expect(backdrop).not.toBeInTheDocument();
  //   });
  // });

  // describe('Sidebar State Management', () => {
  //   it('should maintain sidebar state when switching between pages', async () => {
  //     const { fixture } = await renderComponent();
  //     const store = fixture.debugElement.injector.get(Store);

  //     // User logs in
  //     store.dispatch(new AuthActions.Login({ token: 'mock-token' }));
  //     fixture.detectChanges();

  //     // User collapses sidebar
  //     store.dispatch(new AppActions.CollapseSidebar());
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       const state = store.selectSnapshot(AppStore);
  //       expect(state.sidebarCollapsed).toBe(true);
  //     });

  //     // Sidebar should remain collapsed
  //     const state = store.selectSnapshot(AppStore);
  //     expect(state.sidebarCollapsed).toBe(true);
  //   });

  //   it('should allow user to toggle sidebar state', async () => {
  //     const { fixture } = await renderComponent();
  //     const store = fixture.debugElement.injector.get(Store);

  //     // User logs in
  //     store.dispatch(new AuthActions.Login({ token: 'mock-token' }));
  //     fixture.detectChanges();

  //     // Initial state - not collapsed
  //     breakpointSubject.next({ matches: false });
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       const state = store.selectSnapshot(AppStore);
  //       expect(state.sidebarCollapsed).toBe(false);
  //     });

  //     // User toggles sidebar
  //     store.dispatch(new AppActions.ToggleSidebar());
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       const state = store.selectSnapshot(AppStore);
  //       expect(state.sidebarCollapsed).toBe(true);
  //     });

  //     // User toggles again
  //     store.dispatch(new AppActions.ToggleSidebar());
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       const state = store.selectSnapshot(AppStore);
  //       expect(state.sidebarCollapsed).toBe(false);
  //     });
  //   });
  // });

  // describe('Component Initialization', () => {
  //   it('should initialize with breakpoint observer', async () => {
  //     await renderComponent();

  //     await waitFor(() => {
  //       expect(mockBreakpointObserver.observe).toHaveBeenCalledWith(['(max-width: 991px)']);
  //     });
  //   });

  //   it('should render router-outlet in all scenarios', async () => {
  //     const { fixture } = await renderComponent();
  //     const store = fixture.debugElement.injector.get(Store);

  //     // Not authenticated
  //     expect(screen.getByTestId('router-outlet')).toBeInTheDocument();

  //     // Authenticated
  //     store.dispatch(new AuthActions.Login({ token: 'mock-token' }));
  //     fixture.detectChanges();

  //     await waitFor(() => {
  //       expect(screen.getByTestId('router-outlet')).toBeInTheDocument();
  //     });
  //   });
  // });
});
