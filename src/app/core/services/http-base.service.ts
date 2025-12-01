import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { firstValueFrom } from 'rxjs';

type HttpClientOptions = {
  headers?: HttpHeaders | Record<string, string | string[]>;
  context?: HttpContext;
  params?:
    | HttpParams
    | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
  reportProgress?: boolean;
  withCredentials?: boolean;
  credentials?: RequestCredentials;
  priority?: RequestPriority;
  cache?: RequestCache;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  integrity?: string;
  timeout?: number;
};

@Injectable({
  providedIn: 'root',
}
)
export class HttpService {
  #http = inject(HttpClient);
  #apiUrl = environment.apiUrl;

  get<T>(path: string, options?: HttpClientOptions) {
    return this.#http.get<T>(`${this.#apiUrl}${path}`, options);
  }

  getP<T>(path: string, options?: HttpClientOptions) {
    return firstValueFrom(this.#http.get<T>(`${this.#apiUrl}${path}`, options));
  }

  post<T>(path: string, body: any, options?: HttpClientOptions) {
    return this.#http.post<T>(`${this.#apiUrl}${path}`, body, options);
  }

  postP<T, B>(path: string, body: B, options?: HttpClientOptions) {
    return firstValueFrom(this.#http.post<T>(`${this.#apiUrl}${path}`, body, options));
  }

  put<T, B>(path: string, body: B, options?: HttpClientOptions) {
    return this.#http.put<T>(`${this.#apiUrl}${path}`, body, options);
  }

  putP<T, B>(path: string, body: B, options?: HttpClientOptions) {
    return firstValueFrom(this.#http.put<T>(`${this.#apiUrl}${path}`, body, options));
  }

  delete<T>(path: string, options?: HttpClientOptions) {
    return this.#http.delete<T>(`${this.#apiUrl}${path}`, options);
  }

  deleteP<T>(path: string, options?: HttpClientOptions) {
    return firstValueFrom(this.#http.delete<T>(`${this.#apiUrl}${path}`, options));
  }
}
