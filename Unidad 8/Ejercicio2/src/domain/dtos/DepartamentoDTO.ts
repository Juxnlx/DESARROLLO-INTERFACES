export class DepartamentoDTO {
  private _id?: number;
  private _nombre: string;

  constructor(nombre: string, id?: number) {
    this._nombre = nombre;
    this._id = id;
  }

  // Getters
  get id(): number | undefined { return this._id; }
  get nombre(): string { return this._nombre; }

  // Setters
  set id(value: number | undefined) { this._id = value; }
  set nombre(value: string) { this._nombre = value; }
}