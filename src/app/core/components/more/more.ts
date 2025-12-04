import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-more',
  imports: [NzDropDownModule, NzIconModule],
  templateUrl: './more.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class More {
  deleteChat = output<void>();
  renameChat = output<void>();

  onDeleteChat(): void {
    this.deleteChat.emit();
  }

  onRenameChat(): void {
    this.renameChat.emit();
  }
}
