import { RepositoryPersona } from '../Models/Data/ListaPersona';
import { Persona } from '../Models/Entidades/PersonaModel';

export class IndexVM {
  private _personaSeleccionada: Persona | null = null;
  private _listaDePersona: Persona[] | null = null;

  get listaDePersona(): Persona[] {
    return RepositoryPersona.getPersonas();
  }

  get personaSeleccionada(): Persona | null{
    return this._personaSeleccionada
  }

  set personaSeleccionada(value: Persona) {
    this._personaSeleccionada = value
    this.muestraPersona()
  }

  private muestraPersona() {
    if (this. _personaSeleccionada != null) {
      alert(`Nombre: ${this. _personaSeleccionada?.name} Apellido: ${this. _personaSeleccionada.surname}`)
    }
  }
}

