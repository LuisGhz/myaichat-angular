import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { AuthStore } from '@st/auth/auth.store';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  GithubOutline,
  PlusOutline,
  EditOutline,
  DeleteOutline,
  AudioOutline,
  SendOutline,
  CloseOutline,
  MenuUnfoldOutline,
  MenuFoldOutline,
  ShareAltOutline,
  UserAddOutline,
  MoreOutline,
  SearchOutline,
  InboxOutline,
  MessageOutline,
  FileTextOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  GithubOutline,
  PlusOutline,
  EditOutline,
  DeleteOutline,
  AudioOutline,
  SendOutline,
  CloseOutline,
  MenuUnfoldOutline,
  MenuFoldOutline,
  ShareAltOutline,
  UserAddOutline,
  MoreOutline,
  SearchOutline,
  InboxOutline,
  MessageOutline,
  FileTextOutline,
];

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideNzIcons(icons),
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore(
      [AuthStore],
      withNgxsReduxDevtoolsPlugin(),
      withNgxsFormPlugin(),
      withNgxsRouterPlugin(),
      withNgxsStoragePlugin({
        keys: ['auth'],
      }),
    ),
  ],
};
