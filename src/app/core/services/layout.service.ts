import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  readonly sidebarCollapsed = signal(false);
  readonly selectedChatId = signal<string | null>(null);

  toggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
  }

  selectChat(chatId: string | null): void {
    this.selectedChatId.set(chatId);
  }
}
