export enum E_ACCESS_TYPE {
  IS_VIEW = 'view',
  IS_ADD_EDIT = 'add_edit',
  IS_EXPORT = 'export',
  IS_DELETE = 'delete',
  IS_DOWNLOAD = 'download',
  IS_OTHER_RIGHTS = 'otherRights',
  IS_BUTTON_RIGHTS = 'button_name'
}

export type T_ACCESS_TYPE = keyof typeof E_ACCESS_TYPE;
