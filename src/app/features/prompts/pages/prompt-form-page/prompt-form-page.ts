import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PromptForm } from '../../components';

@Component({
  selector: 'app-prompt-form-page',
  imports: [PromptForm],
  templateUrl: './prompt-form-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptFormPage {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  readonly promptId = this.#route.snapshot.paramMap.get('id');

  onFormCancelled(): void {
    this.#router.navigate(['/prompts']);
  }

  onFormSaved(): void {
    this.#router.navigate(['/prompts']);
  }
}
