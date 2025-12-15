import { Component, Input, Pipe, PipeTransform } from '@angular/core';

/**
 * Mock for MarkdownModule
 * Usage: imports: [MockMarkdownModule]
 */
@Component({
  selector: 'markdown',
  template: '<div [innerHTML]="data"></div>',
})
export class MockMarkdownComponent {
  @Input() data?: string;
  @Input() src?: string;
  @Input() inline?: boolean;
  @Input() emoji?: boolean;
  @Input() katex?: boolean;
  @Input() katexOptions?: any;
  @Input() lineHighlight?: boolean;
  @Input() lineNumbers?: boolean;
  @Input() lineOffset?: number;
  @Input() start?: number;
}

/**
 * Mock for MarkdownPipe
 */
@Pipe({
  name: 'markdown',
})
export class MockMarkdownPipe implements PipeTransform {
  transform(value: string): string {
    return value || '';
  }
}

/**
 * Mock MarkdownModule
 */
export const MockMarkdownModule = {
  declarations: [MockMarkdownComponent, MockMarkdownPipe],
  exports: [MockMarkdownComponent, MockMarkdownPipe],
};
