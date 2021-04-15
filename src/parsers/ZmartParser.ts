import ICategory from 'src/models/ICategory';
import ICondition from 'src/models/ICondition';
import { sanitizeNumber, parseDate, splitByLineBreaks } from 'src/utils';
import logger from 'src/utils/logger';
import BaseParser from './BaseParser';

export default class ZmartParser extends BaseParser {
  protected dateFormat = 'dd/M/yy';

  protected extractId(el: cheerio.Cheerio): number {
    return sanitizeNumber(el.attr('id'));
  }

  protected extractSKU(el: cheerio.Cheerio): string {
    const src: string = el.find(this.config.selectors.sku).attr('src');
    const filename: string = src.split('/').pop();
    const sku: string = filename.split('_')[0];

    return sku;
  }

  protected extractCategoryId(el: cheerio.Cheerio): number {
    const { categories } = this.config;
    const platformClass: string = this.extractClass(el, 1);
    const cleanStr: string = platformClass.replace('BorderPlat', '');
    const category: ICategory = categories.find(
      (item) => item.name === cleanStr || item.codes?.includes(cleanStr)
    );

    if (!category) {
      logger.warn(`The text "${cleanStr}" is not a known category`);
    }

    // TODO: detect non-game categories (books, toys, etc)
    return category?.id;
  }

  protected extractAvailabilityId(el: cheerio.Cheerio): number {
    const { availabilities, selectors } = this.config;
    const str: string = el.find(selectors.availability).text();
    const texts: string[] = splitByLineBreaks(str);
    const availability = availabilities.find((item) =>
      item.codes?.find((code) => texts[0].includes(code))
    );

    if (!availability) {
      logger.warn(`The text "${texts[0]}" is not a known availability`);
    }

    return availability?.id;
  }

  protected extractArrivalDate(el: cheerio.Cheerio): Date {
    const arrivalDate = el.find(this.config.selectors.arrivalDate).text();
    const lines: string[] = splitByLineBreaks(arrivalDate);

    if (lines.length === 1) {
      // "Preventa 17/06/21" => 2021-06-17T04:00:00.000Z
      return parseDate(lines[0].split(' ')[1], this.dateFormat);
    }

    if (lines[1]) {
      // "Próximo Lanzamiento<br>Llegada Estimada: 17/06/21" => 2021-06-17T04:00:00.000Z
      return parseDate(lines[1].split(':')[1], this.dateFormat);
    }

    return undefined;
  }

  protected extractConditionId(el: cheerio.Cheerio): number {
    const { conditions } = this.config;
    const productName: string = this.extractName(el);
    const defaultCondition: ICondition = conditions[0];
    const condition: ICondition = conditions.find((item) =>
      item.codes?.find((code) => productName.includes(code))
    );

    return condition?.id || defaultCondition.id;
  }
}
