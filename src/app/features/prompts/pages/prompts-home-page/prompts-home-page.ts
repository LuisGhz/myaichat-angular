import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PromptList } from '../../components';

@Component({
  selector: 'app-prompts-home-page',
  imports: [PromptList],
  templateUrl: './prompts-home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptsHomePage {}
