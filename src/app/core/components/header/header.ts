import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  #title = inject(Title);
  #router = inject(Router);
  headerTitle = signal('');

  ngOnInit(): void {
    this.#router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      setTimeout(() => {
        this.headerTitle.set(this.#title.getTitle());
      }, 150);
    });

    setTimeout(() => {
      this.headerTitle.set(this.#title.getTitle());
    }, 1000);
  }
}
