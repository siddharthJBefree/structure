import {TemplateRef} from '@angular/core';

export interface DataFormatTypeConfig {
  decimal?: number;
  default?: string | number | undefined;
  badge?: Array<Badge>;
  template?: TemplateRef<any>;
  templateName?: string | number | undefined;
  className?: string;
  linkSeparator?: string;
  format?: string;
  routerLink?: (
    data?: any,
    dataItem?: any
  ) => {
    link: string;
    text?: string;
    target?: '_blank' | '_self' | '_parent' | '_top' | string;
    class?: string;
    disabled?: boolean;
  };
}

interface Badge {
  value: any;
  type: any;
  label: string;
  size?: number;
  hide?: boolean;
}
