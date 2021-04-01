import { IParser, IPrices, IProduct } from 'src/types/interfaces';
import { Availability, Platform } from 'src/types/enums';
import { extractClass } from 'src/helpers/scraperHelper';
import { sanitizeNumber } from 'src/utils';

// TODO: save this URL in a config file
const baseUrl = 'https://www.zmart.cl';

export default class ZmartParser implements IParser {
  async parse($: cheerio.Root): Promise<IProduct[]> {
    const products: IProduct[] = [];

    $('.ProdBox146').each((_, el) => {
      const productEl = $(el);

      products.push({
        name: this.extractName(productEl),
        platform: this.extractPlatform(productEl),
        url: this.extractUrl(productEl),
        availability: this.extractAvailability(productEl),
        ...this.extractPrices(productEl),
      });
    });

    return products;
  }

  private extractName(el: cheerio.Cheerio): string {
    const descriptionEl = el.find('.ProdBox146_Descripcion');
    const linkEl = descriptionEl.find('a');

    return linkEl.text().trim();
  }

  private extractUrl(el: cheerio.Cheerio): string {
    const descriptionEl = el.find('.ProdBox146_Descripcion');
    const linkEl = descriptionEl.find('a');

    return `${baseUrl}${linkEl.attr('href')}`;
  }

  private extractPlatform(el: cheerio.Cheerio): Platform {
    const classPosition = 1;
    const platformClass = extractClass(el, classPosition);

    return this.parsePlatform(platformClass);
  }

  private extractPrices(el: cheerio.Cheerio): IPrices {
    const pricesEl = el.find('.ProdBox146_Precios');
    const price = pricesEl.find('.ProdBox146_Precio').text();
    const listPrice = pricesEl.find('.ProdBox146_PrecioNormal').text();
    const discount = pricesEl.find('.ProdBox146_PrecioDescto').text();

    return {
      price: sanitizeNumber(price),
      listPrice: sanitizeNumber(listPrice),
      discount: sanitizeNumber(discount),
    };
  }

  private extractAvailability(el: cheerio.Cheerio): Availability {
    const pricesEl = el.find('.ProdBox146_Precios');
    const availability = pricesEl.find('.ProdBox146_Disponibilidad').text();

    return this.parseAvailability(availability.trim());
  }

  // TODO: make a dictionary instead of a switch
  private parsePlatform(s: string): Platform {
    const cleanStr = s.startsWith('BorderPlat')
      ? s.replace('BorderPlat', '')
      : s;

    if (cleanStr in Platform) {
      return Platform[cleanStr as keyof typeof Platform];
    }

    switch (cleanStr) {
      case 'BLR':
        return Platform.BluRay;
      case 'PSV':
        return Platform.PSVita;
      case 'WII':
        return Platform.Wii;
      case 'WIIU':
        return Platform.WiiU;
      case 'NDS':
        return Platform.DS;
      case 'NSW':
        return Platform.Switch;
      case 'XBONE':
        return Platform.XboxOne;
      case 'XB360':
        return Platform.Xbox360;
      default:
        return Platform.Unknown;
    }
  }

  // TODO: make a dictionary instead of a switch
  private parseAvailability(s: string): Availability {
    if (s.includes('Preventa')) {
      return Availability.Presale;
    }

    if (s.includes('Próximo Lanzamiento')) {
      return Availability.UpcomingRelease;
    }

    switch (s) {
      case 'Disponible':
        return Availability.Available;
      case 'Agotado':
        return Availability.OutOfStock;
      default:
        return Availability.Unknown;
    }
  }
}
