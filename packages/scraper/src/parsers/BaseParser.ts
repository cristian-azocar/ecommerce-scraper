import cheerio from 'cheerio';
import slugify from 'slugify';
import { IProduct, ILookupTable } from '@project/database';
import {
  IParser,
  IParseResult,
  IPrices,
  IParserConfig,
} from 'src/types/interfaces';
import { sanitizeNumber, parseDate, isUrlAbsolute, logger } from 'src/utils';

export default class BaseParser implements IParser {
  readonly config: IParserConfig;
  protected dateFormat = 'dd/M/yyyy';
  private slugifyOptions = { lower: true, remove: /[*+~.()'"!:@/;,]/g };

  constructor(config: IParserConfig) {
    this.config = config;
  }

  parse(html: string, url: string): IParseResult {
    const $: cheerio.Root = cheerio.load(html);
    const { selectors, retailId } = this.config;
    const products: IProduct[] = [];
    const morePages: boolean = $(selectors.nextPage).length > 0;

    $(selectors.product).each((_, el: cheerio.Element): void => {
      const productEl: cheerio.Cheerio = $(el);
      const productName: string = this.extractName(productEl);

      products.push({
        id: this.extractId(productEl),
        retailId,
        categoryId: this.extractCategoryId(productEl),
        sku: this.extractSKU(productEl),
        name: productName,
        slug: slugify(productName, this.slugifyOptions),
        url: this.extractUrl(productEl),
        imageUrl: this.extractImageUrl(productEl),
        sourceUrl: url,
        availabilityId: this.extractAvailabilityId(productEl),
        arrivalDate: this.extractArrivalDate(productEl),
        conditionId: this.extractConditionId(productEl),
        ...this.extractPrices(productEl),
      });
    });

    return { products, morePages };
  }

  protected extractId(el: cheerio.Cheerio): number {
    return sanitizeNumber(el.find(this.config.selectors.id).text());
  }

  protected extractSKU(el: cheerio.Cheerio): string {
    return el.find(this.config.selectors.sku).text().trim();
  }

  protected extractName(el: cheerio.Cheerio): string {
    return el.find(this.config.selectors.name).text().trim();
  }

  protected extractUrl(el: cheerio.Cheerio): string {
    const url: string = el.find(this.config.selectors.url).attr('href');

    if (isUrlAbsolute(url)) {
      return url;
    }

    return new URL(url, this.config.baseUrl).href;
  }

  protected extractImageUrl(el: cheerio.Cheerio): string {
    return el.find(this.config.selectors.imageUrl).attr('src');
  }

  protected extractCategoryId(el: cheerio.Cheerio): number {
    const { selectors, categories } = this.config;
    const category = this.extractByLookup(el, selectors.platform, categories);

    return category?.id;
  }

  protected extractPrices(el: cheerio.Cheerio): IPrices {
    const { selectors } = this.config;
    const price = sanitizeNumber(el.find(selectors.price).text());
    const listPrice = sanitizeNumber(el.find(selectors.listPrice).text());
    const discount = sanitizeNumber(el.find(selectors.discount).text());
    const discountPercentage = sanitizeNumber(
      el.find(selectors.discountPercentage).text()
    );

    return {
      price,
      listPrice: listPrice || price,
      discount,
      discountPercentage,
    };
  }

  protected extractAvailabilityId(el: cheerio.Cheerio): number {
    const { selectors, availabilities } = this.config;
    const availability = this.extractByLookup(
      el,
      selectors.availability,
      availabilities
    );

    return availability?.id;
  }

  protected extractArrivalDate(el: cheerio.Cheerio): Date {
    const arrivalDate = el.find(this.config.selectors.arrivalDate).text();

    return parseDate(arrivalDate, this.dateFormat);
  }

  protected extractConditionId(el: cheerio.Cheerio): number {
    const { selectors, conditions } = this.config;
    const condition = this.extractByLookup(el, selectors.condition, conditions);

    return condition?.id;
  }

  protected extractClass(el: cheerio.Cheerio, index: number): string {
    return el.attr('class').split(/\s+/)[index];
  }

  private extractByLookup(
    el: cheerio.Cheerio,
    selector: string,
    lookupTables: ILookupTable[]
  ): ILookupTable {
    const str: string = el.find(selector).text().trim();
    const result: ILookupTable = lookupTables.find(
      (item) => item.name === str || item.codes?.includes(str)
    );

    if (!result) {
      logger.warn(`Value "${str}" not found in the lookup tables`);
    }

    return result;
  }
}
