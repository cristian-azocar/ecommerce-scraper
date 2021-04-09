import { Availability } from 'src/types/enums';

export const availabilityDictionary: Record<string, Availability> = {
  Preventa: Availability.Presale,
  'Próximo Lanzamiento': Availability.UpcomingRelease,
  Disponible: Availability.Available,
  Agotado: Availability.OutOfStock,
};
