import {AdminUser} from './admin-user.model';

export class QuoteGroup {
  private _id!: number;
  private _group_name!: string;
  private _status!: number;
  private _created_by!: AdminUser;
  private _created_on!: string;
  private _modified_by!: AdminUser;
  private _modified_on!: string;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get group_name(): string {
    return this._group_name;
  }

  set group_name(value: string) {
    this._group_name = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get created_by(): AdminUser {
    return this._created_by;
  }

  set created_by(value: AdminUser) {
    this._created_by = value;
  }

  get created_on(): string {
    return this._created_on;
  }

  set created_on(value: string) {
    this._created_on = value;
  }

  get modified_by(): AdminUser {
    return this._modified_by;
  }

  set modified_by(value: AdminUser) {
    this._modified_by = value;
  }

  get modified_on(): string {
    return this._modified_on;
  }

  set modified_on(value: string) {
    this._modified_on = value;
  }
}
