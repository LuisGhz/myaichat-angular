import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { dispatch, select } from '@ngxs/store';
import { ChatActions } from '@st/chat/chat.actions';
import { ChatStore } from '@st/chat/chat.store';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-enabled-options',
  imports: [NzIconModule],
  templateUrl: './enabled-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnabledOptions {
  isImageGeneration = select(ChatStore.isImageGeneration);
  #disableImageGeneration = dispatch(ChatActions.DisableImageGeneration);
  isWebSearch = select(ChatStore.isWebSearch);
  #disableWebSearch = dispatch(ChatActions.DisableWebSearch);

  isImageGenerationHovered = signal(false);
  isWebSearchHovered = signal(false);

  closeImageGeneration(): void {
    this.isImageGenerationHovered.set(false);
    this.#disableImageGeneration();
  }

  closeWebSearch(): void {
    this.isWebSearchHovered.set(false);
    this.#disableWebSearch();
  }
}
