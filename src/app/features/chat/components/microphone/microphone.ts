import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-microphone',
  imports: [NzIconModule],
  templateUrl: './microphone.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Microphone {}
