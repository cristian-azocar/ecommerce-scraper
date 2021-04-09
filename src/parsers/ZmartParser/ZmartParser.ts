import cheerio from 'cheerio';
import { extractClass } from 'src/helpers/dom-helper';
import {
  IParser,
  IPrices,
  IProduct,
  IParseResult,
  ISelectors,
  IPlatform,
  ICondition,
} from 'src/types/interfaces';
import { sanitizeNumber, parseDate, splitByLineBreaks } from 'src/utils';
import config from 'src/config/app-config';
import logger from 'src/utils/logger';

export default class ZmartParser implements IParser {
  readonly websiteId: number;
  readonly baseUrl: string;
  readonly selectors: ISelectors;

  constructor(websiteId: number, baseUrl: string, selectors: ISelectors) {
    this.websiteId = websiteId;
    this.baseUrl = baseUrl;
    this.selectors = selectors;
  }

  parse(html: string): IParseResult {
    const $: cheerio.Root = cheerio.load(html);
    const products: IProduct[] = [];
    let morePages: boolean;

    $('script').each((_, el: cheerio.Element): boolean => {
      morePages = this.hasMorePagesLeft($(el).html());
      return !morePages;
    });

    $(this.selectors.product).each((_, el: cheerio.Element): void => {
      const productEl: cheerio.Cheerio = $(el);

      products.push({
        id: this.extractId(productEl),
        websiteId: this.websiteId,
        sku: this.extractSKU(productEl),
        name: this.extractName(productEl),
        platformId: this.extractPlatform(productEl),
        url: this.extractUrl(productEl),
        imageUrl: this.extractImageUrl(productEl),
        availabilityId: this.extractAvailability(productEl),
        estimatedArrivalDate: this.extractEstimatedArrivalDate(productEl),
        conditionId: this.extractCondition(productEl),
        ...this.extractPrices(productEl),
      });
    });

    return { products, morePages };
  }

  private hasMorePagesLeft(script: string): boolean {
    // TODO: improve this validation (maybe use Regex?)
    return (
      script.includes(this.selectors.nextPage) && script.includes('show()')
    );
  }

  private extractId(el: cheerio.Cheerio): number {
    return sanitizeNumber(el.attr('id'));
  }

  private extractSKU(el: cheerio.Cheerio): string {
    const src: string = el.find(this.selectors.sku).attr('src');
    const filename: string = src.split('/').pop();

    return filename.split('_')[0];
  }

  private extractName(el: cheerio.Cheerio): string {
    return el.find(this.selectors.name).text().trim();
  }

  private extractUrl(el: cheerio.Cheerio): string {
    return `${this.baseUrl}${el.find(this.selectors.url).attr('href')}`;
  }

  private extractPlatform(el: cheerio.Cheerio): number {
    const platformClass: string = extractClass(el, 1);
    const cleanStr: string = platformClass.replace('BorderPlat', '');
    const platform: IPlatform = config.platforms.find(
      (item) => item.name === cleanStr || item.lookup?.includes(cleanStr)
    );

    // TODO: detect non-game platforms (books, toys, etc)
    return platform?.id;
  }

  private extractPrices(el: cheerio.Cheerio): IPrices {
    const price = sanitizeNumber(el.find(this.selectors.price).text());
    const listPrice = sanitizeNumber(el.find(this.selectors.listPrice).text());
    const discount = sanitizeNumber(el.find(this.selectors.discount).text());
    const discountPercentage = sanitizeNumber(
      el.find(this.selectors.discountPercentage).text()
    );

    return {
      price,
      listPrice: listPrice || price,
      discount,
      discountPercentage,
    };
  }

  private extractAvailability(el: cheerio.Cheerio): number {
    const str: string = el.find(this.selectors.availability).text();
    const texts: string[] = str.trim().split(' ');
    const availability = config.availabilities.find(
      (item) => item.name === texts[0] || item.lookup?.includes(texts[0])
    );

    if (!availability) {
      logger.debug(`The text "${texts[0]}" is not a known availability`);
    }

    return availability?.id;
  }

  // "Próximo Lanzamiento<br>Llegada Estimada: 17/06/21" => 2021-06-17T04:00:00.000Z
  private extractEstimatedArrivalDate(el: cheerio.Cheerio): Date {
    const estimatedArrival = el
      .find(this.selectors.estimatedArrivalDate)
      .text();
    const texts: string[] = splitByLineBreaks(estimatedArrival);

    if (texts[1] === undefined) {
      return undefined;
    }

    return parseDate(texts[1].split(':')[1], 'dd/M/yy');
  }

  private extractImageUrl(el: cheerio.Cheerio): string {
    // TODO: try to read the fallback url when the normal url is incomplete
    return el.find(this.selectors.imageUrl).attr('src');
  }

  private extractCondition(el: cheerio.Cheerio): number {
    const productName: string = this.extractName(el);
    const defaultCondition: ICondition = config.conditions[0];
    const condition: ICondition = config.conditions.find((item) =>
      item.lookup?.find((lookupItem) => productName.includes(lookupItem))
    );

    return condition?.id || defaultCondition.id;
  }
}
