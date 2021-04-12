import { IWebsite } from 'src/types/interfaces';
import db from '../client';
import schema from '../schema';

const {
  tables: { website },
} = schema;

// eslint-disable-next-line import/prefer-default-export
export async function seed(): Promise<void> {
  await db(website.tableName).del();
  await db<IWebsite>(website.tableName).insert([
    {
      id: 1,
      name: 'Zmart',
      baseUrl: 'https://www.zmart.cl',
      urls: [
        'https://www.zmart.cl/scripts/proddisplay_page.asp?id=321&idRowVar=32641&idRow=2997',
        'https://www.zmart.cl/scripts/proddisplay_page.asp?id=361&idRowVar=34809&idRow=3155',
      ],
      isEnabled: true,
      httpMethod: 'post',
      pagination: { queryString: 'curPage' },
      selectors: {
        id: undefined,
        product: '.BoxProductoS2',
        sku: '.BoxProductoS2_ImageGroup > .BoxProductoS2_Image > a > img',
        name: '.BoxProductoS2_Descripcion > a',
        platform: undefined,
        url: '.BoxProductoS2_Descripcion > a',
        imageUrl: '.BoxProductoS2_ImageGroup > .BoxProductoS2_Image > a > img',
        availability: '.BoxProductoS2_Precios > .BoxProductoS2_Disponibilidad',
        estimatedArrivalDate:
          '.BoxProductoS2_Precios > .BoxProductoS2_Disponibilidad',
        condition: undefined,
        price: '.BoxProductoS2_Precios > .BoxProductoS2_Precio',
        listPrice: '.BoxProductoS2_Precios > .BoxProductoS2_PrecioNormal',
        discount: '.BoxProductoS2_Precios > .BoxProductoS2_PrecioDescto',
        discountPercentage: '.zmart_discount > .boxDesctoPor1 > .boxDesctoPor2',
        nextPage:
          'script:contains("#ProdDisplayType5_MasProductos"):contains("show()")',
      },
    },
  ]);
}
