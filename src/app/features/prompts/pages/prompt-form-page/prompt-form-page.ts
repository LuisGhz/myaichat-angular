import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PromptsApi } from '../../services';
import { PromptMessageModel } from '../../models';

interface MessageFormGroup {
  role: FormControl<'assistant' | 'user'>;
  content: FormControl<string>;
}

interface PromptFormGroup {
  name: FormControl<string>;
  content: FormControl<string>;
  messages: FormArray<FormGroup<MessageFormGroup>>;
}

@Component({
  selector: 'app-prompt-form-page',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
  ],
  templateUrl: './prompt-form-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptFormPage {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #fb = inject(FormBuilder);
  readonly #promptsApi = inject(PromptsApi);

  readonly promptId = this.#route.snapshot.paramMap.get('id');
  readonly isEditMode = signal(false);

  readonly form = this.#fb.group<PromptFormGroup>({
    name: this.#fb.control('', { nonNullable: true, validators: [Validators.required] }),
    content: this.#fb.control('', { nonNullable: true, validators: [Validators.required] }),
    messages: this.#fb.array<FormGroup<MessageFormGroup>>([]),
  });

  constructor() {
    effect(() => {
      const id = this.promptId;
      if (id) {
        this.isEditMode.set(true);
        this.#loadPrompt(id);
      } else {
        this.isEditMode.set(false);
        this.#resetForm();
      }
    });
  }

  get messages(): FormArray<FormGroup<MessageFormGroup>> {
    return this.form.controls.messages;
  }

  async #loadPrompt(id: string): Promise<void> {
    try {
      const prompt = await this.#promptsApi.getById(id);
      this.form.patchValue({
        name: prompt.name,
        content: prompt.content,
      });
      this.messages.clear();
      prompt.messages.forEach((m) => this.#addMessageControl(m));
    } catch (error) {
      console.error('Failed to load prompt:', error);
    }
  }

  #resetForm(): void {
    this.form.reset();
    this.messages.clear();
  }

  #createMessageGroup(message?: Partial<PromptMessageModel>): FormGroup<MessageFormGroup> {
    return this.#fb.group<MessageFormGroup>({
      role: this.#fb.control(message?.role ?? 'user', { nonNullable: true }),
      content: this.#fb.control(message?.content ?? '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  #addMessageControl(message?: Partial<PromptMessageModel>): void {
    this.messages.push(this.#createMessageGroup(message));
  }

  onAddMessage(): void {
    this.#addMessageControl();
  }

  onRemoveMessage(index: number): void {
    this.messages.removeAt(index);
  }

  onCancel(): void {
    this.#resetForm();
    this.#router.navigate(['/prompts']);
  }

  async onSave(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const messages = formValue.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      if (this.promptId) {
        await this.#promptsApi.update(this.promptId, {
          name: formValue.name,
          content: formValue.content,
          messages,
        });
      } else {
        await this.#promptsApi.create({
          name: formValue.name,
          content: formValue.content,
          messages,
        });
      }

      this.#resetForm();
      this.#router.navigate(['/prompts']);
    } catch (error) {
      console.error('Failed to save prompt:', error);
    }
  }
}
