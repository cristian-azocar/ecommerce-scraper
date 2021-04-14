import IRetail from 'src/models/IRetail';
import db from '../client';
import schema from '../schema';

const {
  tables: { retail },
} = schema;
const parentSelectors: string[] = ['.BoxProductoS2', '.ProdBox146'];

function buildSelector(selector: string): string {
  return parentSelectors
    .map((parentSelector) => selector.replace(/\$PARENT/g, parentSelector))
    .join(', ');
}

// eslint-disable-next-line import/prefer-default-export
export async function seed(): Promise<void> {
  await db(retail.tableName).del();
  await db<IRetail>(retail.tableName).insert([
    {
      id: 1,
      name: 'zmart',
      baseUrl: 'https://www.zmart.cl',
      urls: [
        'https://www.zmart.cl/scripts/proddisplay_page.asp?id=321&idRowVar=32641&idRow=2997', // PS4 nuevos
        'https://www.zmart.cl/Scripts/proddisplay.asp?id=24', // PS4 próximamente
        'https://www.zmart.cl/Scripts/prodSearch.asp?strSearch=UPS4', // PS4 usados
        'https://www.zmart.cl/scripts/proddisplay_page.asp?id=361&idRowVar=34809&idRow=3155', // Switch nuevos
        'https://www.zmart.cl/Scripts/prodSearch.asp?strSearch=UNSWG', // Switch usados
        'https://www.zmart.cl/Scripts/proddisplay.asp?id=362', // Switch próximamente
      ],
      isEnabled: true,
      httpMethod: 'post',
      pagination: { queryString: 'curPage' },
      selectors: {
        id: undefined,
        product: parentSelectors.join(', '),
        sku: buildSelector('$PARENT_Image > a > img'),
        name: buildSelector('$PARENT_Descripcion > a'),
        platform: undefined,
        url: buildSelector('$PARENT_Descripcion > a'),
        imageUrl: buildSelector('$PARENT_Image > a > img'),
        availability: buildSelector('$PARENT_Precios > $PARENT_Disponibilidad'),
        estimatedArrivalDate: buildSelector(
          '$PARENT_Precios > $PARENT_Disponibilidad'
        ),
        condition: undefined,
        price: buildSelector('$PARENT_Precios > $PARENT_Precio'),
        listPrice: buildSelector('$PARENT_Precios > $PARENT_PrecioNormal'),
        discount: buildSelector('$PARENT_Precios > $PARENT_PrecioDescto'),
        discountPercentage: '.zmart_discount > .boxDesctoPor1 > .boxDesctoPor2',
        nextPage:
          'script:contains("#ProdDisplayType5_MasProductos"):contains("show()"), script:contains("$(".Search_MasProductos").show()")',
      },
    },
  ]);
}
