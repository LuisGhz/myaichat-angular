import { ChangeDetectionStrategy, Component, signal, ElementRef, inject } from '@angular/core';
import { dispatch, select } from '@ngxs/store';
import { ChatActions } from '@st/chat/chat.actions';
import { ChatStore } from '@st/chat/chat.store';
import { FileStoreService } from '@st/chat/services';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface MenuOption {
  icon: string;
  label: string;
  onClick: () => void;
}

@Component({
  selector: 'app-more-options',
  imports: [NzIconModule],
  templateUrl: './more-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'relative',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class MoreOptions {
  #elementRef = inject(ElementRef);
  #fileStoreService = inject(FileStoreService);
  #fileInput: HTMLInputElement | null = null;
  #setOps = dispatch(ChatActions.SetOps);
  #enableImageGeneration = dispatch(ChatActions.EnableImageGeneration);
  #enableWebSearch = dispatch(ChatActions.EnableWebSearch);
  #isImageGeneration = select(ChatStore.isImageGeneration);
  #isWebSearch = select(ChatStore.isWebSearch);

  isMenuOpen = signal(false);

  menuOptions = signal<MenuOption[]>([
    {
      icon: 'paper-clip',
      label: 'Agregar fotos y archivos',
      onClick: () => this.handleFileUpload(),
    },
    // TODO: Enable OneDrive integration
    // { icon: 'cloud-upload', label: 'Agregar desde OneDrive', onClick: () => {} },
    { icon: 'picture', label: 'Crea imagen', onClick: () => this.#onToggleImageGeneration() },
    { icon: 'compass', label: 'Busca en la web', onClick: () => this.#onToggleWebSearch() },
  ]);

  constructor() {
    this.createFileInput();
  }

  private createFileInput(): void {
    this.#fileInput = document.createElement('input');
    this.#fileInput.type = 'file';
    this.#fileInput.multiple = false;
    this.#fileInput.accept =
      'image/png,image/jpeg,image/jpg,.pdf,.doc,.docx,.txt,.xlsx,.xls,.pptx,.ppt';
    this.#fileInput.style.display = 'none';
    this.#fileInput.addEventListener('change', (e) => this.#onFileSelected(e));
    document.body.appendChild(this.#fileInput);
  }

  private handleFileUpload(): void {
    this.#fileInput?.click();
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  onOptionClick(option: MenuOption): void {
    option.onClick();
    this.closeMenu();
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.#elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  #onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileId = this.#fileStoreService.storeFile(file);
      this.#setOps({
        file: {
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
        },
      });
      input.value = '';
    }
  }

  #onToggleImageGeneration(): void {
    if (this.#isImageGeneration()) return;
    this.#enableImageGeneration();
  }

  #onToggleWebSearch(): void {
    if (this.#isWebSearch()) return;
    this.#enableWebSearch();
  }
}
