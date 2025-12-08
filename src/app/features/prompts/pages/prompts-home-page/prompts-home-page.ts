import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { Router } from '@angular/router';
import { PromptsApi } from '@prompts/services';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-prompts-home-page',
  imports: [NzButtonModule, NzIconModule, NzEmptyModule],
  templateUrl: './prompts-home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptsHomePage {
  readonly #promptsApi = inject(PromptsApi);
  readonly #router = inject(Router);
  prompts = resource({
    loader: () => this.#promptsApi.fetchAll(),
    defaultValue: [],
  });

  onSelectPrompt(id: string): void {
    this.#router.navigate(['/prompts', id]);
  }

  onEdit(id: string, event: Event): void {
    event.stopPropagation();
    this.onSelectPrompt(id);
  }

  async onDelete(id: string, event: Event): Promise<void> {
    event.stopPropagation();
    try {
      await this.#promptsApi.deletePrompt(id);
    } catch (error) {
      console.error('Failed to delete prompt:', error);
    }
  }

  onCreate(): void {
    this.#router.navigate(['/prompts', 'new']);
  }
}
