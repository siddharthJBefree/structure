export class Privilege {
  id!: number;
  tab_name!: string;
  parent_id!: number;
  route_name!: string;
  view!: 0 | 1;
  add_edit!: 0 | 1;
  delete!: 0 | 1;
  export!: 0 | 1;
  download!: 0 | 1;
  is_menu!: 0 | 1;
  otherRights!: string;
}

export interface PrivilegeList extends Array<Privilege> {}
