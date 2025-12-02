import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { select } from '@ngxs/store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MarkdownModule } from 'ngx-markdown';
import { ChatStore } from '@st/chat/chat.store';

@Component({
  selector: 'app-messages',
  imports: [NzIconModule, MarkdownModule],
  templateUrl: './messages.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full w-full' },
})
export class Messages {
  messages = select(ChatStore.getMessages);
  #copiedIndex = signal<number | null>(null);

  onCopyClick(content: string, index: number): void {
    this.#copyToClipboard(content, index);
  }

  isCopied(index: number): boolean {
    return this.#copiedIndex() === index;
  }

  async #copyToClipboard(text: string, index: number): Promise<void> {
    const MS = 500;
    try {
      await navigator.clipboard.writeText(text);
      this.#copiedIndex.set(index);
      setTimeout(() => this.#copiedIndex.set(null), MS);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
}
