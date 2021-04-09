import { Knex } from 'knex';
import schema from '../schema';

const {
  tables: { website },
} = schema;

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(website.tableName).del();

  // Inserts seed entries
  await knex(website.tableName).insert([
    {
      id: 1,
      name: 'Zmart',
      base_url: 'https://www.zmart.cl',
      urls: [
        'https://www.zmart.cl/scripts/proddisplay_page.asp?id=321&idRowVar=32641&idRow=2997',
        'https://www.zmart.cl/scripts/proddisplay_page.asp?id=361&idRowVar=34809&idRow=3155',
      ],
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
      is_enabled: true,
    },
  ]);
}
