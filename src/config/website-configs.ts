import { Website } from 'src/types/enums';
import { IWebsiteConfig } from 'src/types/interfaces';

// TODO: set this config from a external source (env var, file, etc)
const websiteConfigs: Record<Website, IWebsiteConfig> = {
  [Website.Zmart]: {
    baseUrl: 'https://www.zmart.cl',
    enabled: true,
    urls: [
      'https://www.zmart.cl/scripts/proddisplay_page.asp?id=321&idRowVar=32641&idRow=2997',
      // 'https://www.zmart.cl/scripts/proddisplay_page.asp?id=361&idRowVar=34809&idRow=3155',
    ],
    // ProdBox146 = when searching for a specific game
    // BoxProductoS2 = when browsing a catalog
    selectors: {
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
    },
  },
};

export default websiteConfigs;
