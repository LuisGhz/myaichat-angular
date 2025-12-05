import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface MenuOption {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-more-options',
  imports: [NzIconModule],
  templateUrl: './more-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'relative',
  },
})
export class MoreOptions {
  #elementRef = inject(ElementRef);

  isMenuOpen = signal(false);

  menuOptions = signal<MenuOption[]>([
    { icon: 'paper-clip', label: 'Agregar fotos y archivos' },
    { icon: 'cloud-upload', label: 'Agregar desde OneDrive' },
    { icon: 'picture', label: 'Crea imagen' },
    { icon: 'compass', label: 'Busca en la web' },
  ]);

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  onOptionClick(_option: MenuOption): void {
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.#elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
}
