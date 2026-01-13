export class PersonaDTO {
  private _id?: number;
  private _nombre: string;
  private _apellidos: string;
  private _telefono: string;
  private _direccion: string;
  private _foto: string;
  private _fechaNacimiento: Date;
  private _idDepartamento: number;
  private _nombreDepartamento: string;

  constructor(
    nombre: string,
    apellidos: string,
    telefono: string,
    direccion: string,
    foto: string,
    fechaNacimiento: Date,
    idDepartamento: number,
    nombreDepartamento: string,
    id?: number
  ) {
    this._nombre = nombre;
    this._apellidos = apellidos;
    this._telefono = telefono;
    this._direccion = direccion;
    this._foto = foto;
    this._fechaNacimiento = fechaNacimiento;
    this._idDepartamento = idDepartamento;
    this._nombreDepartamento = nombreDepartamento;
    this._id = id;
  }

  // Getters
  get id(): number | undefined { return this._id; }
  get nombre(): string { return this._nombre; }
  get apellidos(): string { return this._apellidos; }
  get telefono(): string { return this._telefono; }
  get direccion(): string { return this._direccion; }
  get foto(): string { return this._foto; }
  get fechaNacimiento(): Date { return this._fechaNacimiento; }
  get idDepartamento(): number { return this._idDepartamento; }
  get nombreDepartamento(): string { return this._nombreDepartamento; }

  // Setters
  set id(value: number | undefined) { this._id = value; }
  set nombre(value: string) { this._nombre = value; }
  set apellidos(value: string) { this._apellidos = value; }
  set telefono(value: string) { this._telefono = value; }
  set direccion(value: string) { this._direccion = value; }
  set foto(value: string) { this._foto = value; }
  set fechaNacimiento(value: Date) { this._fechaNacimiento = value; }
  set idDepartamento(value: number) { this._idDepartamento = value; }
  set nombreDepartamento(value: string) { this._nombreDepartamento = value; }
}