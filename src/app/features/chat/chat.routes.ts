import { Routes } from '@angular/router';
import { ChatPage } from './pages/chat-page/chat-page';

export const CHAT_ROUTES: Routes = [
  {
    path: '',
    component: ChatPage,
    title: 'Start a new conversation',
  },
  {
    path: 'chat/:id',
    component: ChatPage,
  }
];
