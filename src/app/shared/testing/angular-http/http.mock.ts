import { vi } from 'vitest';
import { of, throwError, Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';

/**
 * Creates a mock HttpClient
 *
 * @param overrides Optional overrides for specific HttpClient methods
 * @returns Mock HttpClient instance
 *
 * @example
 * ```typescript
 * const mockHttp = createMockHttpClient({
 *   get: vi.fn().mockReturnValue(of({ data: 'test' }))
 * });
 *
 * TestBed.configureTestingModule({
 *   providers: [
 *     { provide: HttpClient, useValue: mockHttp }
 *   ]
 * });
 * ```
 */
export function createMockHttpClient(overrides?: Partial<any>) {
  return {
    get: vi.fn().mockReturnValue(of({})),
    post: vi.fn().mockReturnValue(of({})),
    put: vi.fn().mockReturnValue(of({})),
    patch: vi.fn().mockReturnValue(of({})),
    delete: vi.fn().mockReturnValue(of({})),
    head: vi.fn().mockReturnValue(of({})),
    options: vi.fn().mockReturnValue(of({})),
    request: vi.fn().mockReturnValue(of({})),
    ...overrides,
  };
}

/**
 * Creates a mock HttpResponse
 *
 * @param body Response body
 * @param options Optional response options
 * @returns Mock HttpResponse instance
 *
 * @example
 * ```typescript
 * const response = createMockHttpResponse(
 *   { data: 'test' },
 *   { status: 200, statusText: 'OK' }
 * );
 * ```
 */
export function createMockHttpResponse<T>(
  body: T,
  options: {
    headers?: HttpHeaders | { [name: string]: string | string[] };
    status?: number;
    statusText?: string;
    url?: string;
  } = {}
): HttpResponse<T> {
  return new HttpResponse({
    body,
    headers: options.headers instanceof HttpHeaders
      ? options.headers
      : new HttpHeaders(options.headers || {}),
    status: options.status || 200,
    statusText: options.statusText || 'OK',
    url: options.url || '',
  });
}

/**
 * Creates a mock HttpErrorResponse
 *
 * @param error Error message or error object
 * @param options Optional error options
 * @returns Mock HttpErrorResponse instance
 *
 * @example
 * ```typescript
 * const error = createMockHttpErrorResponse(
 *   'Not Found',
 *   { status: 404, statusText: 'Not Found' }
 * );
 *
 * const mockHttp = createMockHttpClient({
 *   get: vi.fn().mockReturnValue(throwError(() => error))
 * });
 * ```
 */
export function createMockHttpErrorResponse(
  error: any = 'Error',
  options: {
    headers?: HttpHeaders | { [name: string]: string | string[] };
    status?: number;
    statusText?: string;
    url?: string;
  } = {}
): HttpErrorResponse {
  return new HttpErrorResponse({
    error,
    headers: options.headers instanceof HttpHeaders
      ? options.headers
      : new HttpHeaders(options.headers || {}),
    status: options.status || 500,
    statusText: options.statusText || 'Internal Server Error',
    url: options.url || '',
  });
}

/**
 * Creates a mock HttpHeaders
 *
 * @param headers Optional headers object
 * @returns Mock HttpHeaders instance
 *
 * @example
 * ```typescript
 * const headers = createMockHttpHeaders({
 *   'Content-Type': 'application/json',
 *   'Authorization': 'Bearer token'
 * });
 * ```
 */
export function createMockHttpHeaders(headers: { [name: string]: string | string[] } = {}): HttpHeaders {
  return new HttpHeaders(headers);
}

/**
 * Creates a mock HttpParams
 *
 * @param params Optional params object
 * @returns Mock HttpParams instance
 *
 * @example
 * ```typescript
 * const params = createMockHttpParams({
 *   page: '1',
 *   limit: '10'
 * });
 * ```
 */
export function createMockHttpParams(params: { [param: string]: string | string[] } = {}): HttpParams {
  let httpParams = new HttpParams();
  Object.keys(params).forEach(key => {
    const value = params[key];
    if (Array.isArray(value)) {
      value.forEach(v => {
        httpParams = httpParams.append(key, v);
      });
    } else {
      httpParams = httpParams.set(key, value);
    }
  });
  return httpParams;
}

/**
 * Helper to create a successful HTTP response Observable
 *
 * @param data Response data
 * @param options Optional response options
 * @returns Observable of HttpResponse
 *
 * @example
 * ```typescript
 * const mockHttp = createMockHttpClient({
 *   get: vi.fn().mockReturnValue(
 *     createMockHttpSuccess({ users: [] })
 *   )
 * });
 * ```
 */
export function createMockHttpSuccess<T>(
  data: T,
  options?: {
    headers?: HttpHeaders | { [name: string]: string | string[] };
    status?: number;
    statusText?: string;
    url?: string;
  }
): Observable<T> {
  return of(data);
}

/**
 * Helper to create an HTTP error Observable
 *
 * @param error Error message or error object
 * @param options Optional error options
 * @returns Observable that throws HttpErrorResponse
 *
 * @example
 * ```typescript
 * const mockHttp = createMockHttpClient({
 *   get: vi.fn().mockReturnValue(
 *     createMockHttpError('Not Found', { status: 404 })
 *   )
 * });
 * ```
 */
export function createMockHttpError(
  error: any = 'Error',
  options?: {
    headers?: HttpHeaders | { [name: string]: string | string[] };
    status?: number;
    statusText?: string;
    url?: string;
  }
): Observable<never> {
  return throwError(() => createMockHttpErrorResponse(error, options));
}

/**
 * Creates a mock HTTP interceptor context
 *
 * @example
 * ```typescript
 * const context = createMockHttpContext();
 * ```
 */
export function createMockHttpContext() {
  return {
    set: vi.fn().mockReturnThis(),
    get: vi.fn(),
    has: vi.fn().mockReturnValue(false),
    delete: vi.fn().mockReturnThis(),
    keys: vi.fn().mockReturnValue([]),
  };
}
