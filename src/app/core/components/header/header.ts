import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { LayoutService } from '../../services/layout.service';
import { AiModelModel } from '../../../features/chat/models';

@Component({
  selector: 'app-header',
  imports: [
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzToolTipModule,
  ],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly layoutService = inject(LayoutService);

  protected readonly models = signal<AiModelModel[]>([
    { id: 'gpt-4', name: 'ChatGPT' },
    { id: 'gpt-4o', name: 'GPT-4o' },
    { id: 'gpt-4o-mini', name: 'GPT-4o mini' },
    { id: 'o1', name: 'o1' },
    { id: 'o1-mini', name: 'o1-mini' },
  ]);

  protected selectedModel = 'gpt-4';

  onNewChat(): void {
    this.layoutService.selectChat(null);
  }
}
