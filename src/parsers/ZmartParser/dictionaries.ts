import { Availability, Platform } from 'src/types/enums';

export const platformDictionary: Record<string, Platform> = {
  BLR: Platform.BluRay,
  PSV: Platform.PSVita,
  WII: Platform.Wii,
  WIIU: Platform.WiiU,
  NDS: Platform.DS,
  NSW: Platform.Switch,
  XBONE: Platform.XboxOne,
  XB360: Platform.Xbox360,
};

export const availabilityDictionary: Record<string, Availability> = {
  Preventa: Availability.Presale,
  'Próximo Lanzamiento': Availability.UpcomingRelease,
  Disponible: Availability.Available,
  Agotado: Availability.OutOfStock,
};
