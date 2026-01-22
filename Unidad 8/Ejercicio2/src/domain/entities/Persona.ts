export class Persona {
  private _id: number;
  private _nombre: string;
  private _apellidos: string;
  private _telefono: string;
  private _direccion: string;
  private _foto: string;
  private _fechaNacimiento: Date;
  private _idDepartamento: number;

  constructor(
    id: number,
    nombre: string,
    apellidos: string,
    telefono: string,
    direccion: string,
    foto: string,
    fechaNacimiento: Date,
    idDepartamento: number
  ) {
    this._id = id;
    this._nombre = nombre;
    this._apellidos = apellidos;
    this._telefono = telefono;
    this._direccion = direccion;
    this._foto = foto;
    this._fechaNacimiento = fechaNacimiento;
    this._idDepartamento = idDepartamento;
  }

  // Getters
  get id(): number { return this._id; }
  get nombre(): string { return this._nombre; }
  get apellidos(): string { return this._apellidos; }
  get telefono(): string { return this._telefono; }
  get direccion(): string { return this._direccion; }
  get foto(): string { return this._foto; }
  get fechaNacimiento(): Date { return this._fechaNacimiento; }
  get idDepartamento(): number { return this._idDepartamento; }

  // Setters
  set id(value: number) { this._id = value; }
  set nombre(value: string) { this._nombre = value; }
  set apellidos(value: string) { this._apellidos = value; }
  set telefono(value: string) { this._telefono = value; }
  set direccion(value: string) { this._direccion = value; }
  set foto(value: string) { this._foto = value; }
  set fechaNacimiento(value: Date) { this._fechaNacimiento = value; }
  set idDepartamento(value: number) { this._idDepartamento = value; }

  // Metodo de negocio
  calcularEdad(): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - this._fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - this._fechaNacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < this._fechaNacimiento.getDate())) {
      edad--;
    }
    
    return edad;
  }
}