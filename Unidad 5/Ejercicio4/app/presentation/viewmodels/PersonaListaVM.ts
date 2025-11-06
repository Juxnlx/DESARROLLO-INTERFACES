import { useEffect, useState } from "react";
import { PersonaRepository100 } from "../../data/repositories/PersonaRepository100";
import { PersonaRepositoryEmpty } from "../../data/repositories/PersonaRepositoryEmpty";
import { PersonaModel } from "../models/PersonaModel";


export const usePersonaListaVM = (useEmpty = false) => {
  const [personas, setPersonas] = useState<PersonaModel[]>([]);

  useEffect(() => {
    const repository = useEmpty
      ? new PersonaRepositoryEmpty()
      : new PersonaRepository100();

    const useCase = new PersonaRepositoryUseCase(repository);
    const domainPersons = useCase.execute();
    const models = domainPersons.map((p) => new PersonaModel(p));
    setPersonas(models);
  }, [useEmpty]);

  return { personas };
};