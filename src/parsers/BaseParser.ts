import cheerio from 'cheerio';
import {
  IParser,
  IParseResult,
  IPrices,
  IParserConfig,
} from 'src/types/interfaces';
import IProduct from 'src/models/IProduct';
import ILookupTable from 'src/models/ILookupTable';
import { sanitizeNumber, parseDate, isUrlAbsolute } from 'src/utils';

export default class BaseParser implements IParser {
  readonly config: IParserConfig;
  protected dateFormat = 'dd/M/yyyy';

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
      const product: IProduct = {
        id: this.extractId(productEl),
        retailId,
        sku: this.extractSKU(productEl),
        name: this.extractName(productEl),
        platformId: this.extractPlatformId(productEl),
        url: this.extractUrl(productEl),
        imageUrl: this.extractImageUrl(productEl),
        sourceUrl: url,
        availabilityId: this.extractAvailabilityId(productEl),
        estimatedArrivalDate: this.extractEstimatedArrivalDate(productEl),
        conditionId: this.extractConditionId(productEl),
        ...this.extractPrices(productEl),
      };

      products.push(product);
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

  protected extractPlatformId(el: cheerio.Cheerio): number {
    const { selectors, platforms } = this.config;
    const platform = this.extractByLookup(el, selectors.platform, platforms);

    return platform?.id;
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

  protected extractEstimatedArrivalDate(el: cheerio.Cheerio): Date {
    const estimatedArrival = el
      .find(this.config.selectors.estimatedArrivalDate)
      .text();

    return parseDate(estimatedArrival, this.dateFormat);
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
    lookupTable: Array<ILookupTable>
  ): ILookupTable {
    const str: string = el.find(selector).text().trim();

    return lookupTable.find(
      (item) => item.name === str || item.lookup?.includes(str)
    );
  }
}
