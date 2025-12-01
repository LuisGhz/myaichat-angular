import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LayoutService } from '@core/services/layout.service';
import { InputMessage } from '@chat/components/input/input-message';

@Component({
  selector: 'app-chat-view',
  imports: [FormsModule, NzButtonModule, NzIconModule, NzInputModule, InputMessage],
  templateUrl: './chat-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage {
  protected readonly layoutService = inject(LayoutService);
}
