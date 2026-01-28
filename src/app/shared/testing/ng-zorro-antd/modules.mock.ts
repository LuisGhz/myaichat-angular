import { Component, Directive, Input, Output, EventEmitter } from '@angular/core';

/**
 * Mock for NzIconModule
 * Usage: imports: [MockNzIconModule]
 */
@Component({
  selector: 'nz-icon',
  template: '<span [attr.data-icon]="nzType">{{ nzType }}</span>',
})
export class MockNzIconComponent {
  @Input() nzType?: string;
  @Input() nzTheme?: string;
  @Input() nzRotate?: number;
  @Input() nzTwotoneColor?: string;
  @Input() nzIconfont?: string;
}

export const MockNzIconModule = {
  declarations: [MockNzIconComponent],
  exports: [MockNzIconComponent],
};

/**
 * Mock for NzButtonModule
 * Usage: imports: [MockNzButtonModule]
 */
@Directive({
  selector: '[nz-button]',
})
export class MockNzButtonDirective {
  @Input() nzType?: string;
  @Input() nzSize?: string;
  @Input() nzShape?: string;
  @Input() nzBlock?: boolean;
  @Input() nzLoading?: boolean;
  @Input() nzDanger?: boolean;
  @Input() nzGhost?: boolean;
}

export const MockNzButtonModule = {
  declarations: [MockNzButtonDirective],
  exports: [MockNzButtonDirective],
};

/**
 * Mock for NzInputModule
 * Usage: imports: [MockNzInputModule]
 */
@Directive({
  selector: '[nz-input]',
})
export class MockNzInputDirective {
  @Input() nzSize?: string;
  @Input() nzBorderless?: boolean;
  @Input() nzStatus?: string;
  @Input() disabled?: boolean;
}

@Component({
  selector: 'nz-input-group',
  template: '<ng-content></ng-content>',
})
export class MockNzInputGroupComponent {
  @Input() nzSize?: string;
  @Input() nzCompact?: boolean;
  @Input() nzSearch?: boolean;
  @Input() nzAddOnBefore?: string;
  @Input() nzAddOnAfter?: string;
  @Input() nzPrefix?: string;
  @Input() nzSuffix?: string;
}

@Component({
  selector: 'textarea[nz-input]',
  template: '<ng-content></ng-content>',
})
export class MockNzTextareaComponent {
  @Input() nzAutosize?: boolean | { minRows?: number; maxRows?: number };
  @Input() nzBorderless?: boolean;
}

export const MockNzInputModule = {
  declarations: [MockNzInputDirective, MockNzInputGroupComponent, MockNzTextareaComponent],
  exports: [MockNzInputDirective, MockNzInputGroupComponent, MockNzTextareaComponent],
};

/**
 * Mock for NzSelectModule
 * Usage: imports: [MockNzSelectModule]
 */
@Component({
  selector: 'nz-select',
  template: '<ng-content></ng-content>',
})
export class MockNzSelectComponent {
  @Input() ngModel?: any;
  @Input() nzMode?: string;
  @Input() nzSize?: string;
  @Input() nzPlaceHolder?: string;
  @Input() nzDisabled?: boolean;
  @Input() nzShowSearch?: boolean;
  @Input() nzAllowClear?: boolean;
  @Input() nzLoading?: boolean;
  @Output() ngModelChange = new EventEmitter();
  @Output() nzOpenChange = new EventEmitter();
}

@Component({
  selector: 'nz-option',
  template: '<ng-content></ng-content>',
})
export class MockNzOptionComponent {
  @Input() nzValue?: any;
  @Input() nzLabel?: string;
  @Input() nzDisabled?: boolean;
  @Input() nzHide?: boolean;
  @Input() nzCustomContent?: boolean;
}

export const MockNzSelectModule = {
  declarations: [MockNzSelectComponent, MockNzOptionComponent],
  exports: [MockNzSelectComponent, MockNzOptionComponent],
};

/**
 * Mock for NzModalModule
 * Usage: imports: [MockNzModalModule]
 */
@Component({
  selector: 'nz-modal',
  template: '<ng-content></ng-content>',
})
export class MockNzModalComponent {
  @Input() nzVisible?: boolean;
  @Input() nzTitle?: string;
  @Input() nzContent?: any;
  @Input() nzFooter?: any;
  @Input() nzClosable?: boolean;
  @Input() nzMaskClosable?: boolean;
  @Input() nzCentered?: boolean;
  @Input() nzWidth?: string | number;
  @Input() nzOkText?: string;
  @Input() nzCancelText?: string;
  @Input() nzOkLoading?: boolean;
  @Input() nzOkDisabled?: boolean;
  @Output() nzVisibleChange = new EventEmitter<boolean>();
  @Output() nzOnOk = new EventEmitter();
  @Output() nzOnCancel = new EventEmitter();
}

export const MockNzModalModule = {
  declarations: [MockNzModalComponent],
  exports: [MockNzModalComponent],
};

/**
 * Mock for NzFormModule
 * Usage: imports: [MockNzFormModule]
 */
@Directive({
  selector: '[nz-form]',
})
export class MockNzFormDirective {
  @Input() nzLayout?: string;
  @Input() nzAutoTips?: any;
}

@Component({
  selector: 'nz-form-item',
  template: '<ng-content></ng-content>',
})
export class MockNzFormItemComponent {}

@Component({
  selector: 'nz-form-label',
  template: '<ng-content></ng-content>',
})
export class MockNzFormLabelComponent {
  @Input() nzFor?: string;
  @Input() nzRequired?: boolean;
  @Input() nzNoColon?: boolean;
}

@Component({
  selector: 'nz-form-control',
  template: '<ng-content></ng-content>',
})
export class MockNzFormControlComponent {
  @Input() nzValidateStatus?: string;
  @Input() nzHasFeedback?: boolean;
  @Input() nzErrorTip?: string;
  @Input() nzWarningTip?: string;
  @Input() nzSuccessTip?: string;
  @Input() nzValidatingTip?: string;
}

export const MockNzFormModule = {
  declarations: [
    MockNzFormDirective,
    MockNzFormItemComponent,
    MockNzFormLabelComponent,
    MockNzFormControlComponent,
  ],
  exports: [
    MockNzFormDirective,
    MockNzFormItemComponent,
    MockNzFormLabelComponent,
    MockNzFormControlComponent,
  ],
};

/**
 * Mock for NzTableModule
 * Usage: imports: [MockNzTableModule]
 */
@Component({
  selector: 'nz-table',
  template: '<ng-content></ng-content>',
})
export class MockNzTableComponent {
  @Input() nzData?: any[];
  @Input() nzLoading?: boolean;
  @Input() nzSize?: string;
  @Input() nzPageSize?: number;
  @Input() nzPageIndex?: number;
  @Input() nzShowPagination?: boolean;
  @Input() nzFrontPagination?: boolean;
  @Input() nzTotal?: number;
  @Input() nzScroll?: { x?: string; y?: string };
  @Output() nzPageIndexChange = new EventEmitter<number>();
  @Output() nzPageSizeChange = new EventEmitter<number>();
}

@Component({
  selector: 'thead',
  template: '<ng-content></ng-content>',
})
export class MockNzTheadComponent {}

@Component({
  selector: 'tbody',
  template: '<ng-content></ng-content>',
})
export class MockNzTbodyComponent {}

@Component({
  selector: 'tr',
  template: '<ng-content></ng-content>',
})
export class MockNzTrComponent {}

@Component({
  selector: 'th',
  template: '<ng-content></ng-content>',
})
export class MockNzThComponent {
  @Input() nzWidth?: string;
  @Input() nzAlign?: string;
  @Input() nzSortOrder?: string | null;
  @Input() nzSortFn?: any;
}

@Component({
  selector: 'td',
  template: '<ng-content></ng-content>',
})
export class MockNzTdComponent {
  @Input() nzAlign?: string;
}

export const MockNzTableModule = {
  declarations: [
    MockNzTableComponent,
    MockNzTheadComponent,
    MockNzTbodyComponent,
    MockNzTrComponent,
    MockNzThComponent,
    MockNzTdComponent,
  ],
  exports: [
    MockNzTableComponent,
    MockNzTheadComponent,
    MockNzTbodyComponent,
    MockNzTrComponent,
    MockNzThComponent,
    MockNzTdComponent,
  ],
};

/**
 * Mock for NzEmptyModule
 * Usage: imports: [MockNzEmptyModule]
 */
@Component({
  selector: 'nz-empty',
  template: '<div>No Data</div>',
})
export class MockNzEmptyComponent {
  @Input() nzNotFoundContent?: string;
  @Input() nzNotFoundImage?: string;
  @Input() nzNotFoundFooter?: any;
}

export const MockNzEmptyModule = {
  declarations: [MockNzEmptyComponent],
  exports: [MockNzEmptyComponent],
};

/**
 * Mock for NzAlertModule
 * Usage: imports: [MockNzAlertModule]
 */
@Component({
  selector: 'nz-alert',
  template: '<ng-content></ng-content>',
})
export class MockNzAlertComponent {
  @Input() nzType?: string;
  @Input() nzMessage?: string;
  @Input() nzDescription?: string;
  @Input() nzCloseable?: boolean;
  @Input() nzShowIcon?: boolean;
  @Input() nzBanner?: boolean;
  @Input() nzIconType?: string;
  @Output() nzOnClose = new EventEmitter();
}

export const MockNzAlertModule = {
  declarations: [MockNzAlertComponent],
  exports: [MockNzAlertComponent],
};

/**
 * Mock for NzSpinModule
 * Usage: imports: [MockNzSpinModule]
 */
@Component({
  selector: 'nz-spin',
  template: '<ng-content></ng-content>',
})
export class MockNzSpinComponent {
  @Input() nzSpinning?: boolean;
  @Input() nzSize?: string;
  @Input() nzTip?: string;
  @Input() nzDelay?: number;
  @Input() nzSimple?: boolean;
}

export const MockNzSpinModule = {
  declarations: [MockNzSpinComponent],
  exports: [MockNzSpinComponent],
};

/**
 * Mock for NzAvatarModule
 * Usage: imports: [MockNzAvatarModule]
 */
@Component({
  selector: 'nz-avatar',
  template: '<ng-content></ng-content>',
})
export class MockNzAvatarComponent {
  @Input() nzShape?: string;
  @Input() nzSize?: string | number;
  @Input() nzIcon?: string;
  @Input() nzSrc?: string;
  @Input() nzText?: string;
}

export const MockNzAvatarModule = {
  declarations: [MockNzAvatarComponent],
  exports: [MockNzAvatarComponent],
};

/**
 * Mock for NzTooltipDirective
 * Usage: imports: [MockNzTooltipModule]
 */
@Directive({
  selector: '[nz-tooltip]',
})
export class MockNzTooltipDirective {
  @Input() nzTooltipTitle?: string;
  @Input() nzTooltipPlacement?: string;
  @Input() nzTooltipTrigger?: string;
  @Input() nzTooltipVisible?: boolean;
  @Input() nzTooltipOverlayClassName?: string;
  @Input() nzTooltipOverlayStyle?: any;
  @Output() nzTooltipVisibleChange = new EventEmitter<boolean>();
}

export const MockNzTooltipModule = {
  declarations: [MockNzTooltipDirective],
  exports: [MockNzTooltipDirective],
};

/**
 * Mock for NzMenuModule
 * Usage: imports: [MockNzMenuModule]
 */
@Component({
  selector: '[nz-menu]',
  template: '<ng-content></ng-content>',
})
export class MockNzMenuComponent {
  @Input() nzMode?: string;
  @Input() nzTheme?: string;
  @Input() nzInlineCollapsed?: boolean;
  @Input() nzSelectable?: boolean;
}

@Component({
  selector: '[nz-menu-item]',
  template: '<ng-content></ng-content>',
})
export class MockNzMenuItemComponent {
  @Input() nzSelected?: boolean;
  @Input() nzDisabled?: boolean;
  @Input() nzDanger?: boolean;
}

@Component({
  selector: '[nz-submenu]',
  template: '<ng-content></ng-content>',
})
export class MockNzSubMenuComponent {
  @Input() nzTitle?: string;
  @Input() nzIcon?: string;
  @Input() nzOpen?: boolean;
  @Input() nzDisabled?: boolean;
}

export const MockNzMenuModule = {
  declarations: [MockNzMenuComponent, MockNzMenuItemComponent, MockNzSubMenuComponent],
  exports: [MockNzMenuComponent, MockNzMenuItemComponent, MockNzSubMenuComponent],
};

/**
 * Mock for NzSkeletonModule
 * Usage: imports: [MockNzSkeletonModule]
 */
@Component({
  selector: 'nz-skeleton',
  template: '<div>Loading...</div>',
})
export class MockNzSkeletonComponent {
  @Input() nzActive?: boolean;
  @Input() nzLoading?: boolean;
  @Input() nzTitle?: boolean | any;
  @Input() nzAvatar?: boolean | any;
  @Input() nzParagraph?: boolean | any;
}

export const MockNzSkeletonModule = {
  declarations: [MockNzSkeletonComponent],
  exports: [MockNzSkeletonComponent],
};

/**
 * Mock for NzDropDownModule
 * Usage: imports: [MockNzDropDownModule]
 */
@Directive({
  selector: '[nz-dropdown]',
})
export class MockNzDropdownDirective {
  @Input() nzDropdownMenu?: any;
  @Input() nzTrigger?: string;
  @Input() nzPlacement?: string;
  @Input() nzVisible?: boolean;
  @Input() nzDisabled?: boolean;
  @Output() nzVisibleChange = new EventEmitter<boolean>();
}

@Component({
  selector: 'nz-dropdown-menu',
  template: '<ng-content></ng-content>',
})
export class MockNzDropdownMenuComponent {}

export const MockNzDropDownModule = {
  declarations: [MockNzDropdownDirective, MockNzDropdownMenuComponent],
  exports: [MockNzDropdownDirective, MockNzDropdownMenuComponent],
};

/**
 * Mock for NzLayoutModule
 * Usage: imports: [MockNzLayoutModule]
 */
@Component({
  selector: 'nz-layout',
  template: '<ng-content></ng-content>',
})
export class MockNzLayoutComponent {
  @Input() nzClass?: string;
}

@Component({
  selector: 'nz-header',
  template: '<ng-content></ng-content>',
})
export class MockNzHeaderComponent {}

@Component({
  selector: 'nz-content',
  template: '<ng-content></ng-content>',
})
export class MockNzContentComponent {}

@Component({
  selector: 'nz-footer',
  template: '<ng-content></ng-content>',
})
export class MockNzFooterComponent {}

@Component({
  selector: 'nz-sider',
  template: '<ng-content></ng-content>',
})
export class MockNzSiderComponent {
  @Input() nzCollapsed?: boolean;
  @Input() nzWidth?: string | number;
  @Input() nzCollapsedWidth?: number;
  @Input() nzBreakpoint?: string;
  @Output() nzCollapsedChange = new EventEmitter<boolean>();
}

export const MockNzLayoutModule = {
  declarations: [
    MockNzLayoutComponent,
    MockNzHeaderComponent,
    MockNzContentComponent,
    MockNzFooterComponent,
    MockNzSiderComponent,
  ],
  exports: [
    MockNzLayoutComponent,
    MockNzHeaderComponent,
    MockNzContentComponent,
    MockNzFooterComponent,
    MockNzSiderComponent,
  ],
};

/**
 * Mock for NzTabsModule
 * Usage: imports: [MockNzTabsModule]
 */
@Component({
  standalone: true,
  selector: 'nz-tabset',
  template: '<ng-content></ng-content>',
})
export class MockNzTabSetComponent {
  @Input() nzSelectedIndex?: number;
  @Input() nzTabPosition?: string;
  @Input() nzType?: string;
  @Input() nzSize?: string;
  @Input() nzAnimated?: boolean;
  @Output() nzSelectedIndexChange = new EventEmitter<number>();
  @Output() nzSelectChange = new EventEmitter<any>();
}

@Component({
  standalone: true,
  selector: 'nz-tab',
  template: '<ng-content></ng-content>',
})
export class MockNzTabComponent {
  @Input() nzTitle?: string;
  @Input() nzDisabled?: boolean;
  @Input() nzForceRender?: boolean;
}

export const MockNzTabsModule = [MockNzTabSetComponent, MockNzTabComponent] as const;

/**
 * Mock for NzPopconfirmModule
 * Usage: imports: [MockNzPopconfirmModule]
 */
@Directive({
  selector: '[nz-popconfirm]',
})
export class MockNzPopconfirmDirective {
  @Input() nzPopconfirmTitle?: string;
  @Input() nzPopconfirmTrigger?: string;
  @Input() nzPopconfirmPlacement?: string;
  @Input() nzOkText?: string;
  @Input() nzCancelText?: string;
  @Input() nzOkType?: string;
  @Input() nzCondition?: boolean;
  @Input() nzIcon?: string;
  @Output() nzOnConfirm = new EventEmitter();
  @Output() nzOnCancel = new EventEmitter();
}

export const MockNzPopconfirmModule = {
  declarations: [MockNzPopconfirmDirective],
  exports: [MockNzPopconfirmDirective],
};

/**
 * Mock for NzInputNumberModule
 * Usage: imports: [MockNzInputNumberModule]
 */
@Component({
  selector: 'nz-input-number',
  template: '<input type="number" />',
})
export class MockNzInputNumberComponent {
  @Input() ngModel?: number;
  @Input() nzMin?: number;
  @Input() nzMax?: number;
  @Input() nzStep?: number;
  @Input() nzSize?: string;
  @Input() nzDisabled?: boolean;
  @Input() nzPlaceHolder?: string;
  @Input() nzPrecision?: number;
  @Output() ngModelChange = new EventEmitter<number>();
}

export const MockNzInputNumberModule = {
  declarations: [MockNzInputNumberComponent],
  exports: [MockNzInputNumberComponent],
};
