import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
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
import { PromptService } from '../../services';
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
  selector: 'app-prompt-form',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
  ],
  templateUrl: './prompt-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptForm {
  readonly #fb = inject(FormBuilder);
  readonly #promptService = inject(PromptService);

  readonly promptId = input<string | null>(null);
  readonly cancelled = output<void>();
  readonly saved = output<void>();

  readonly isEditMode = signal(false);

  readonly form = this.#fb.group<PromptFormGroup>({
    name: this.#fb.control('', { nonNullable: true, validators: [Validators.required] }),
    content: this.#fb.control('', { nonNullable: true, validators: [Validators.required] }),
    messages: this.#fb.array<FormGroup<MessageFormGroup>>([]),
  });

  constructor() {
    effect(() => {
      const id = this.promptId();
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

  #loadPrompt(id: string): void {
    const prompt = this.#promptService.getById(id);
    if (prompt) {
      this.form.patchValue({
        name: prompt.name,
        content: prompt.content,
      });
      this.messages.clear();
      prompt.messages.forEach((m) => this.#addMessageControl(m));
    }
  }

  #resetForm(): void {
    this.form.reset();
    this.messages.clear();
  }

  #createMessageGroup(message?: Partial<PromptMessageModel>): FormGroup<MessageFormGroup> {
    return this.#fb.group<MessageFormGroup>({
      role: this.#fb.control(message?.role ?? 'user', { nonNullable: true }),
      content: this.#fb.control(message?.content ?? '', { nonNullable: true, validators: [Validators.required] }),
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
    this.cancelled.emit();
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const messages: Omit<PromptMessageModel, 'id'>[] = formValue.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const promptId = this.promptId();
    if (promptId) {
      this.#promptService.update(promptId, {
        name: formValue.name,
        content: formValue.content,
        messages: messages as PromptMessageModel[],
      });
    } else {
      this.#promptService.create({
        name: formValue.name,
        content: formValue.content,
        messages: messages as PromptMessageModel[],
      });
    }

    this.#resetForm();
    this.saved.emit();
  }
}
