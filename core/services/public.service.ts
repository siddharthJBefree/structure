import {Injectable} from '@angular/core';
import {API_ROUTES} from '../constants/api-routes.const';
import {DROPDOWN_ROUTES} from '../constants/dropdown-routes.const';
import {APP_ROUTES} from '../constants/routes.const';
import {SHORTCUT_KEY} from '../constants/shortcut-key.const';
import {Decrypt, Encrypt} from '../functions/crypto.function';
import {FixDecimal} from '../functions/fix-decimal.function';
import {HasValue} from '../functions/has-value.function';
import {ComboItem} from '../models/generic/combo.model';
import {HasValueType} from './../functions/has-value.function';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  readonly appRoutes = APP_ROUTES;
  readonly apiRoutes = API_ROUTES;
  readonly dropdownRoutes = DROPDOWN_ROUTES;
  readonly shortcutKey = SHORTCUT_KEY;
  hasValue = HasValue;
  hasValueType = HasValueType;
  fixDecimal = FixDecimal;
  encrypt = Encrypt;
  decrypt = Decrypt;

  deepCopyObject(obj: object) {
    return JSON.parse(JSON.stringify(obj));
  }

  jsonParse(value: any) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }

  valueExtractor(id: any, dropdown: Array<ComboItem>, type: 'both' | 'value' = 'value'): any {
    const val = dropdown.find((elem) => elem.key === id);
    if (type === 'value') {
      return val?.label || '';
    } else {
      return `${val?.key} - ${val?.label}`;
    }
  }
}
