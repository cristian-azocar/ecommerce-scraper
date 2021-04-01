import cheerio from 'cheerio';
import { IParser, IPrices, IProduct } from 'src/types/interfaces';
import { Availability, Platform } from 'src/types/enums';
import { extractClass } from 'src/helpers/domHelper';
import { sanitizeNumber, parseDate, splitByLineBreaks } from 'src/utils';
import {
  selectors,
  platformDictionary,
  availabilityDictionary,
} from './dictionaries';

// TODO: save this URL in a config file
const baseUrl = 'https://www.zmart.cl';

export default class ZmartParser implements IParser {
  async parse(html: string): Promise<IProduct[]> {
    const $: cheerio.Root = cheerio.load(html);
    const products: IProduct[] = [];

    $(selectors.product).each((_, el: cheerio.Element): void => {
      const productEl: cheerio.Cheerio = $(el);

      products.push({
        id: this.extractId(productEl),
        sku: this.extractSKU(productEl),
        name: this.extractName(productEl),
        platform: this.extractPlatform(productEl),
        url: this.extractUrl(productEl),
        imageUrl: this.extractImageUrl(productEl),
        availability: this.extractAvailability(productEl),
        estimatedArrivalDate: this.extractEstimatedArrivalDate(productEl),
        ...this.extractPrices(productEl),
      });
    });

    return products;
  }

  private extractId(el: cheerio.Cheerio): number {
    return sanitizeNumber(el.attr('id'));
  }

  private extractSKU(el: cheerio.Cheerio): string {
    const src: string = el.find(selectors.sku).attr('src');
    const filename: string = src.split('/').pop();

    return filename.split('_')[0];
  }

  private extractName(el: cheerio.Cheerio): string {
    return el.find(selectors.name).text().trim();
  }

  private extractUrl(el: cheerio.Cheerio): string {
    return `${baseUrl}${el.find(selectors.url).attr('href')}`;
  }

  private extractPlatform(el: cheerio.Cheerio): Platform {
    const classIndex = 1;
    const platformClass: string = extractClass(el, classIndex);
    const cleanStr: string = platformClass.replace('BorderPlat', '');

    if (cleanStr in Platform) {
      return Platform[cleanStr as keyof typeof Platform];
    }

    return platformDictionary[cleanStr] || Platform.Unknown;
  }

  private extractPrices(el: cheerio.Cheerio): IPrices {
    const price = el.find(selectors.price).text();
    const listPrice = el.find(selectors.listPrice).text();
    const discount = el.find(selectors.discount).text();
    const discountPercentage = el.find(selectors.discountPercentage).text();

    return {
      price: sanitizeNumber(price),
      listPrice: sanitizeNumber(listPrice),
      discount: sanitizeNumber(discount),
      discountPercentage: sanitizeNumber(discountPercentage),
    };
  }

  private extractAvailability(el: cheerio.Cheerio): Availability {
    const availability: string = el.find(selectors.availability).text();
    const texts: string[] = availability.trim().split(/\r\n|\r|\n/);

    return availabilityDictionary[texts[0]] || Availability.Unknown;
  }

  // "Próximo Lanzamiento<br>Llegada Estimada: 17/06/21" => 2021-06-17T04:00:00.000Z
  private extractEstimatedArrivalDate(el: cheerio.Cheerio): Date {
    const estimatedArrival = el.find(selectors.estimatedArrivalDate).text();
    const texts: string[] = splitByLineBreaks(estimatedArrival);

    if (texts[1] === undefined) {
      return undefined;
    }

    return parseDate(texts[1].split(':')[1], 'dd/M/yy');
  }

  private extractImageUrl(el: cheerio.Cheerio): string {
    // TODO: try to read the fallback url when the normal url is incomplete
    return el.find(selectors.imageUrl).attr('src');
  }
}
