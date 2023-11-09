import {TemplateType} from '../models/generic/table.model';
export const MatchModeOptionsConst: {[key in TemplateType]: Array<{label: string; value: string; valueType?: any}>} = {
  DEFAULT: [
    {label: 'Contain', value: 'contain'},
    {label: 'Not Contain', value: 'notContain'},
    {label: 'Equals', value: 'equals'},
    {label: 'Not Equals', value: 'notEquals'},
    {label: 'Starts With', value: 'startsWith'},
    {label: 'Ends With', value: 'endsWith'}
  ],
  NUMBER: [
    {label: 'Equals', value: 'equals'},
    {label: 'Not Equals', value: 'notEquals'},
    {label: 'Less Than', value: 'lessThan'},
    {label: 'Greater Than', value: 'greaterThan'},
    {label: 'Less Than Or Equal', value: 'lessThanOrEqual'},
    {label: 'Greater Than Or Equal', value: 'greaterThanOrEqual'},
    {label: 'Is Between', value: 'isBetween', valueType: {from: '', to: ''}},
    {label: 'Is Not Between', value: 'isNotBetween', valueType: {from: '', to: ''}}
  ],
  DATE_TIME: [
    {label: 'Date Is', value: 'dateIs'},
    {label: 'Date Is Not', value: 'dateIsNot'},
    {label: 'Date Is Before', value: 'dateIsBefore'},
    {label: 'Date Is After', value: 'dateIsAfter'},
    {label: 'Date Is Between', value: 'dateIsBetween'},
    {label: 'Date Is Not Between', value: 'dateIsNotBetween'}
  ],
  DATE: [
    {label: 'Date Is', value: 'dateIs'},
    {label: 'Date Is Not', value: 'dateIsNot'},
    {label: 'Date Is Before', value: 'dateIsBefore'},
    {label: 'Date Is After', value: 'dateIsAfter'},
    {label: 'Date Is Between', value: 'dateIsBetween'},
    {label: 'Date Is Not Between', value: 'dateIsNotBetween'}
  ],
  TIME: [
    {label: 'Time Is Exactly', value: 'timeIsExactly'},
    {label: 'Time Is Before', value: 'timeIsBefore'},
    {label: 'Time Is After', value: 'timeIsAfter'},
    {label: 'Time Is Between', value: 'timeIsBetween'}
  ],
  HOUR_MINUTE: [
    {label: 'Time Is Exactly', value: 'timeIsExactly'},
    {label: 'Time Is Before', value: 'timeIsBefore'},
    {label: 'Time Is After', value: 'timeIsAfter'},
    {label: 'Time Is Between', value: 'timeIsBetween'}
  ],
  BADGE: [
    {label: 'Badge Is', value: 'badgeIs'},
    {label: 'Badge Is Not', value: 'badgeIsNot'}
  ],
  BOOLEAN: [
    {label: 'Is True', value: 'isTrue'},
    {label: 'Is False', value: 'isFalse'},
    {label: 'Is Null', value: 'isNull'}
  ],
  ARRAY: [
    {label: 'Array Contains', value: 'arrayContains'},
    {label: 'Array Not Contains', value: 'arrayNotContains'},
    {label: 'Array Is Empty', value: 'arrayIsEmpty'}
  ],
  OBJECT: [
    {label: 'Object Equals', value: 'objectEquals'},
    {label: 'Object Not Equals', value: 'objectNotEquals'}
  ],
  DROPDOWN: [
    {label: 'Is Equals', value: 'isEquals'},
    {label: 'Is Not Equals', value: 'isNotEquals'}
  ]
};
