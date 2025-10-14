export class Persona {
  private _id: number;
  private _name: string;
  private _surname: string;

  constructor(id: number, name: string, surname: string) {
    this._id = id;
    this._name = name;
    this._surname = surname;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }
}
