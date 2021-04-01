import { Availability, Platform } from 'src/types/enums';
import { ISelectors } from 'src/types/interfaces';

export const selectors: ISelectors = {
  product: '.ProdBox146',
  name: '.ProdBox146_Descripcion > a',
  url: '.ProdBox146_Descripcion > a',
  imageUrl: '.ProdBox146_Image > a > img',
  availability: '.ProdBox146_Precios > .ProdBox146_Disponibilidad',
  estimatedArrivalDate: '.ProdBox146_Precios > .ProdBox146_Disponibilidad',
  price: '.ProdBox146_Precios > .ProdBox146_Precio',
  listPrice: '.ProdBox146_Precios > .ProdBox146_PrecioNormal',
  discount: '.ProdBox146_Precios > .ProdBox146_PrecioDescto',
  discountPercentage: '.zmart_discount > .boxDesctoPor1 > .boxDesctoPor2',
};

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
