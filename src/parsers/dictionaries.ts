import { Availability, Platform } from 'src/types/enums';
import { ISelectors } from 'src/types/interfaces';

// ProdBox146 = when searching for a specific game
// BoxProductoS2 = when browsing a catalog

export const selectors: ISelectors = {
  product: '.BoxProductoS2',
  sku: '.BoxProductoS2_ImageGroup > .BoxProductoS2_Image > a > img',
  name: '.BoxProductoS2_Descripcion > a',
  url: '.BoxProductoS2_Descripcion > a',
  imageUrl: '.BoxProductoS2_ImageGroup > .BoxProductoS2_Image > a > img',
  availability: '.BoxProductoS2_Precios > .BoxProductoS2_Disponibilidad',
  estimatedArrivalDate:
    '.BoxProductoS2_Precios > .BoxProductoS2_Disponibilidad',
  price: '.BoxProductoS2_Precios > .BoxProductoS2_Precio',
  listPrice: '.BoxProductoS2_Precios > .BoxProductoS2_PrecioNormal',
  discount: '.BoxProductoS2_Precios > .BoxProductoS2_PrecioDescto',
  discountPercentage: '.zmart_discount > .boxDesctoPor1 > .boxDesctoPor2',
  nextPage: '#ProdDisplayType5_MasProductos',
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
