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
import { provideHttpClient, withInterceptors } from '@angular/common/http';
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
  PaperClipOutline,
  CloudUploadOutline,
  PictureOutline,
  ExperimentOutline,
  RadarChartOutline,
  ShoppingCartOutline,
  ReadOutline,
  CompassOutline,
  RightOutline,
  FilePdfOutline,
  FileWordOutline,
  FileExcelOutline,
  FilePptOutline,
  FileOutline,
} from '@ant-design/icons-angular/icons';
import { provideMarkdown } from 'ngx-markdown';
import { authInterceptor } from '@core/interceptors';
import { ChatStore } from '@st/chat/chat.store';
import { AppStore } from '@st/app/app.store';

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
  PaperClipOutline,
  CloudUploadOutline,
  PictureOutline,
  ExperimentOutline,
  RadarChartOutline,
  ShoppingCartOutline,
  ReadOutline,
  CompassOutline,
  RightOutline,
  FilePdfOutline,
  FileWordOutline,
  FileExcelOutline,
  FilePptOutline,
  FileOutline,
];

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideNzIcons(icons),
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore(
      [AuthStore, ChatStore, AppStore],
      withNgxsReduxDevtoolsPlugin(),
      withNgxsFormPlugin(),
      withNgxsRouterPlugin(),
      withNgxsStoragePlugin({
        keys: ['auth'],
      }),
    ),
    provideMarkdown(),
  ],
};
