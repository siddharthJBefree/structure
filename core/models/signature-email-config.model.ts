export class EmailSignature {
  private _id!: number;
  private _user_id!: string;
  private _bk_user_id!: string;
  private _show_in_quote!: string;
  private _show_in_welcomemail!: string;
  private _email!: string;
  private _bcc!: string;
  private _designation_id!: string;
  private _order_by!: number;
  private _signature!: string;
  private _crm!: number;
  private _imap_username!: string;
  private _imap_password!: string;
  private _is_imap_configured!: number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get user_id(): string {
    return this._user_id;
  }

  set user_id(value: string) {
    this._user_id = value;
  }

  get bk_user_id(): string {
    return this._bk_user_id;
  }

  set bk_user_id(value: string) {
    this._bk_user_id = value;
  }

  get show_in_quote(): string {
    return this._show_in_quote;
  }

  set show_in_quote(value: string) {
    this._show_in_quote = value;
  }

  get show_in_welcomemail(): string {
    return this._show_in_welcomemail;
  }

  set show_in_welcomemail(value: string) {
    this._show_in_welcomemail = value;
  }

  get bcc(): string {
    return this._bcc;
  }

  set bcc(value: string) {
    this._bcc = value;
  }

  get designation_id(): string {
    return this._designation_id;
  }

  set designation_id(value: string) {
    this._designation_id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get order_by(): number {
    return this._order_by;
  }

  set order_by(value: number) {
    this._order_by = value;
  }

  get signature(): string {
    return this._signature;
  }

  set signature(value: string) {
    this._signature = value;
  }

  get crm(): number {
    return this._crm;
  }

  set crm(value: number) {
    this._crm = value;
  }

  get imap_username(): string {
    return this._imap_username;
  }

  set imap_username(value: string) {
    this._imap_username = value;
  }

  get imap_password(): string {
    return this._imap_password;
  }

  set imap_password(value: string) {
    this._imap_password = value;
  }

  get is_imap_configured(): number {
    return this._is_imap_configured;
  }

  set is_imap_configured(value: number) {
    this._is_imap_configured = value;
  }
}
