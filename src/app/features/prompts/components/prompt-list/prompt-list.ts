import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { PromptService } from '../../services';

@Component({
  selector: 'app-prompt-list',
  imports: [NzButtonModule, NzIconModule, NzEmptyModule],
  templateUrl: './prompt-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptList {
  readonly #promptService = inject(PromptService);
  readonly #router = inject(Router);

  readonly prompts = this.#promptService.prompts;
  readonly selectedPromptId = this.#promptService.selectedPromptId;

  onSelectPrompt(id: string): void {
    this.#promptService.selectPrompt(id);
    this.#router.navigate(['/prompts', id]);
  }

  onEdit(id: string, event: Event): void {
    event.stopPropagation();
    this.onSelectPrompt(id);
  }

  onDelete(id: string, event: Event): void {
    event.stopPropagation();
    this.#promptService.delete(id);
  }

  onCreate(): void {
    this.#router.navigate(['/prompts', 'new']);
  }
}
