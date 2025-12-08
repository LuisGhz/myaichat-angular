import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { dispatch, select } from '@ngxs/store';
import { ChatStore } from '@st/chat/chat.store';
import { ChatActions } from '@st/chat/chat.actions';
import { ChatApi } from '@chat/services/chat-api';

interface AdvancedSettingsFormModel {
  maxTokens: FormControl<number>;
  temperature: FormControl<number>;
}

@Component({
  selector: 'app-advanced-settings',
  imports: [NzModalModule, NzInputNumberModule, FormsModule, ReactiveFormsModule],
  templateUrl: './advanced-settings.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedSettings {
  isVisible = input.required<boolean>();
  closeModal = output<void>();

  #fb = inject(FormBuilder);
  #chatApi = inject(ChatApi);
  #ops = select(ChatStore.getOps);
  #currentChatId = select(ChatStore.getCurrentChatId);
  #setOps = dispatch(ChatActions.SetOps);
  form = this.#fb.group<AdvancedSettingsFormModel>({
    maxTokens: this.#fb.nonNullable.control<number>(this.#ops().maxTokens, [
      Validators.min(100),
      Validators.max(8000),
    ]),
    temperature: this.#fb.nonNullable.control<number>(this.#ops().temperature, [
      Validators.min(0),
      Validators.max(1),
    ]),
  });

  maxTokens = computed(() => this.#ops().maxTokens);
  maxTokensTimeout: number | null = null;
  temperature = computed(() => this.#ops().temperature);
  temperatureTimeout: number | null = null;
  debounceDelay = 500;

  ngOnInit(): void {
    this.form.controls.maxTokens.valueChanges.subscribe((value) => {
      if (value !== null) this.onMaxTokensChange(value);
    });
    this.form.controls.temperature.valueChanges.subscribe((value) => {
      if (value !== null) this.onTemperatureChange(value);
    });
  }

  onMaxTokensChange(value: number): void {
    this.#setOps({ maxTokens: value });
    const chatId = this.#currentChatId();
    if (this.maxTokensTimeout) clearTimeout(this.maxTokensTimeout);
    this.maxTokensTimeout = setTimeout(() => {
      if (chatId) this.#chatApi.updateMaxTokens(chatId, this.maxTokens());
    }, this.debounceDelay);
  }

  onTemperatureChange(value: number): void {
    this.#setOps({ temperature: value });
    if (this.temperatureTimeout) clearTimeout(this.temperatureTimeout);
    const chatId = this.#currentChatId();
    this.temperatureTimeout = setTimeout(() => {
      if (chatId) this.#chatApi.updateTemperature(chatId, this.temperature());
    }, this.debounceDelay);
  }
}
