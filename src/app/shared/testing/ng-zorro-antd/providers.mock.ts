import { Provider } from '@angular/core';
import { vi } from 'vitest';

/**
 * Mock provider for NZ_I18N
 *
 * @example
 * ```typescript
 * TestBed.configureTestingModule({
 *   providers: [mockProvideNzI18n()]
 * });
 * ```
 */
export function mockProvideNzI18n(locale: any = { locale: 'en' }): Provider {
  return {
    provide: 'NZ_I18N',
    useValue: locale,
  };
}

/**
 * Mock provider for NZ_ICONS
 *
 * @param icons Optional array of icon definitions
 * @returns Provider for NZ_ICONS
 *
 * @example
 * ```typescript
 * TestBed.configureTestingModule({
 *   providers: [mockProvideNzIcons()]
 * });
 * ```
 */
export function mockProvideNzIcons(icons: any[] = []): Provider {
  return {
    provide: 'NZ_ICONS',
    useValue: icons,
  };
}

/**
 * Mock NZ_ICON_DEFAULT_TWOTONE_COLOR token
 */
export function mockProvideNzIconDefaultTwotoneColor(color: string = '#1890ff'): Provider {
  return {
    provide: 'NZ_ICON_DEFAULT_TWOTONE_COLOR',
    useValue: color,
  };
}
