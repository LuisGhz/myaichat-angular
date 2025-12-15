import { signal, Signal } from '@angular/core';
import { vi } from 'vitest';
import { Observable, of } from 'rxjs';

/**
 * Creates a mock select function for NGXS
 *
 * @param initialValue The initial value for the signal
 * @returns A signal that can be used as a mock selector
 *
 * @example
 * ```typescript
 * const mockUser = createMockSelect({ id: 1, name: 'John' });
 *
 * // In your component:
 * // readonly user = select(UserState.currentUser);
 *
 * // In your test, replace the select function:
 * vi.mock('@ngxs/store', () => ({
 *   select: vi.fn(() => mockUser)
 * }));
 * ```
 */
export function createMockSelect<T>(initialValue: T): Signal<T> {
  return signal(initialValue);
}

/**
 * Creates a mock dispatch function for NGXS
 *
 * @param returnValue Optional return value for the dispatch function
 * @returns A mock dispatch function
 *
 * @example
 * ```typescript
 * const mockDispatch = createMockDispatch();
 *
 * // In your component:
 * // readonly fireAction = dispatch(AppActions.ActionName);
 *
 * // In your test:
 * vi.mock('@ngxs/store', () => ({
 *   dispatch: vi.fn(() => mockDispatch)
 * }));
 *
 * // Use it:
 * mockDispatch({ payload: 'test' });
 * expect(mockDispatch).toHaveBeenCalledWith({ payload: 'test' });
 * ```
 */
export function createMockDispatch<T = any>(returnValue?: Observable<any>) {
  return vi.fn().mockReturnValue(returnValue || of(undefined));
}

/**
 * Creates a mock Store instance for NGXS
 *
 * @param overrides Optional overrides for specific Store methods
 * @returns Mock Store instance
 *
 * @example
 * ```typescript
 * const mockStore = createMockStore({
 *   selectSnapshot: vi.fn().mockReturnValue({ user: 'John' }),
 *   select: vi.fn().mockReturnValue(of({ user: 'John' }))
 * });
 *
 * TestBed.configureTestingModule({
 *   providers: [
 *     { provide: Store, useValue: mockStore }
 *   ]
 * });
 * ```
 */
export function createMockStore(overrides?: Partial<any>) {
  return {
    dispatch: vi.fn().mockReturnValue(of(undefined)),
    select: vi.fn().mockReturnValue(of(undefined)),
    selectOnce: vi.fn().mockReturnValue(of(undefined)),
    selectSnapshot: vi.fn().mockReturnValue(undefined),
    subscribe: vi.fn(),
    reset: vi.fn(),
    snapshot: vi.fn().mockReturnValue({}),
    ...overrides,
  };
}

/**
 * Creates a mock provideStore configuration for testing
 *
 * @param states Optional array of state classes
 * @param options Optional NGXS options
 * @returns Mock provider configuration
 *
 * @example
 * ```typescript
 * TestBed.configureTestingModule({
 *   providers: [
 *     mockProvideStore([AppState, UserState])
 *   ]
 * });
 * ```
 */
export function mockProvideStore(states: any[] = [], options: any = {}) {
  const mockStore = createMockStore();

  return [
    {
      provide: 'NGXS_STATE_FACTORY',
      useValue: vi.fn(),
    },
    {
      provide: 'Store',
      useValue: mockStore,
    },
    {
      provide: 'NGXS_OPTIONS',
      useValue: {
        developmentMode: false,
        compatibility: {
          strictContentSecurityPolicy: true,
        },
        ...options,
      },
    },
  ];
}

/**
 * Creates a mock StateContext for NGXS actions
 *
 * @param initialState The initial state value
 * @returns Mock StateContext instance
 *
 * @example
 * ```typescript
 * const mockCtx = createMockStateContext({ count: 0 });
 *
 * // Test your action handler:
 * const result = myActionHandler(mockCtx, new MyAction());
 * expect(mockCtx.patchState).toHaveBeenCalledWith({ count: 1 });
 * ```
 */
export function createMockStateContext<T>(initialState: T) {
  return {
    getState: vi.fn().mockReturnValue(initialState),
    setState: vi.fn(),
    patchState: vi.fn(),
    dispatch: vi.fn().mockReturnValue(of(undefined)),
  };
}

/**
 * Helper to create a mock selector function
 *
 * @param returnValue The value to return from the selector
 * @returns A mock selector function
 *
 * @example
 * ```typescript
 * const mockSelector = createMockSelector({ name: 'John' });
 *
 * TestBed.configureTestingModule({
 *   providers: [
 *     { provide: Store, useValue: createMockStore({
 *       select: mockSelector
 *     })}
 *   ]
 * });
 * ```
 */
export function createMockSelector<T>(returnValue: T) {
  return vi.fn().mockReturnValue(of(returnValue));
}
