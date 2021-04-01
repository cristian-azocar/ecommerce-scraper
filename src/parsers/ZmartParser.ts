import cheerio from 'cheerio';
import { IParser, IPrices, IProduct } from 'src/types/interfaces';
import { Availability, Platform } from 'src/types/enums';
import { extractClass } from 'src/helpers/scraperHelper';
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
    const $ = cheerio.load(html);
    const products: IProduct[] = [];

    $(selectors.product).each((_, el) => {
      const productEl = $(el);

      products.push({
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
    return el.find(selectors.imageUrl).attr('src');
  }
}
