import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { dispatch, select } from '@ngxs/store';
import { ChatStore } from '@st/chat/chat.store';
import { ChatActions } from '@st/chat/chat.actions';

@Component({
  selector: 'app-advanced-settings',
  imports: [NzModalModule, NzInputNumberModule, FormsModule],
  templateUrl: './advanced-settings.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedSettings {
  isVisible = input.required<boolean>();
  closeModal = output<void>();

  #ops = select(ChatStore.getOps);
  #setOps = dispatch(ChatActions.SetOps);

  maxTokens = computed(() => this.#ops().maxTokens);
  temperature = computed(() => this.#ops().temperature);

  onMaxTokensChange(value: number): void {
    this.#setOps({ maxTokens: value });
  }

  onTemperatureChange(value: number): void {
    this.#setOps({ temperature: value });
  }
}
