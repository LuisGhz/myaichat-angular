import { Routes } from '@angular/router';
import { ChatView } from './components/chat-view/chat-view';

export const CHAT_ROUTES: Routes = [
  {
    path: '',
    component: ChatView,
  },
];
