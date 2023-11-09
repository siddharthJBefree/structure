import {AdminUser} from './admin-user.model';

export class QuoteQuestion {
  private _id!: number;
  private _group_id!: number;
  private _service_id!: number;
  private _sub_service_id!: number;
  private _question_name!: string;
  private _answer!: string;
  private _answer_type!: string;
  private _answer_value!: string;
  private _is_dependant!: number;
  private _is_required!: number;
  private _entity_type!: number;
  private _is_tax_additional!: number;
  private _is_active!: number;
  private _service_name!: string;
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

  get group_id(): number {
    return this._group_id;
  }

  set group_id(value: number) {
    this._group_id = value;
  }

  get service_id(): number {
    return this._service_id;
  }

  set service_id(value: number) {
    this._service_id = value;
  }

  get sub_service_id(): number {
    return this._sub_service_id;
  }

  set sub_service_id(value: number) {
    this._sub_service_id = value;
  }

  get question_name(): string {
    return this._question_name;
  }

  set question_name(value: string) {
    this._question_name = value;
  }

  get answer(): string {
    return this._answer;
  }

  set answer(value: string) {
    this._answer = value;
  }

  get answer_type(): string {
    return this._answer_type;
  }

  set answer_type(value: string) {
    this._answer_type = value;
  }

  get answer_value(): string {
    return this._answer_value;
  }

  set answer_value(value: string) {
    this._answer_value = value;
  }

  get is_dependant(): number {
    return this._is_dependant;
  }

  set is_dependant(value: number) {
    this._is_dependant = value;
  }

  get is_required(): number {
    return this._is_required;
  }

  set is_required(value: number) {
    this._is_required = value;
  }

  get entity_type(): number {
    return this._entity_type;
  }

  set entity_type(value: number) {
    this._entity_type = value;
  }

  get is_tax_additional(): number {
    return this._is_tax_additional;
  }

  set is_tax_additional(value: number) {
    this._is_tax_additional = value;
  }

  get is_active(): number {
    return this._is_active;
  }

  set is_active(value: number) {
    this._is_active = value;
  }

  get service_name(): string {
    return this._service_name;
  }

  set service_name(value: string) {
    this._service_name = value;
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
