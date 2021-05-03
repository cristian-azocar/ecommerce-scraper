import { Category, Condition } from '@project/database';
import { sanitizeNumber, parseDate, splitByLineBreaks, logger } from '../utils';
import BaseParser from './BaseParser';

export default class ZmartParser extends BaseParser {
  protected dateFormat = 'dd/M/yy';

  protected extractId(el: cheerio.Cheerio): number {
    return sanitizeNumber(el.attr('id'));
  }

  protected extractSKU(el: cheerio.Cheerio): string | undefined {
    const src = el.find(this.config.selectors.sku).attr('src');
    const filename = src?.split('/').pop();
    const sku = filename?.split('_')[0];

    return sku;
  }

  protected extractCategoryId(el: cheerio.Cheerio): number | undefined {
    const { categories } = this.config;
    const platformClass = this.extractClass(el, 1);

    if (!platformClass) {
      logger.warn(`Could not extract the element class`);
      return undefined;
    }

    const cleanStr = platformClass.replace('BorderPlat', '');
    const category: Category | undefined = categories.find(
      (item) => item.name === cleanStr || item.codes?.includes(cleanStr)
    );

    if (!category) {
      logger.warn(`The text "${cleanStr}" is not a known category`);
    }

    // TODO: detect non-game categories (books, toys, etc)
    return category?.id;
  }

  protected extractAvailabilityId(el: cheerio.Cheerio): number | undefined {
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

  protected extractArrivalDate(el: cheerio.Cheerio): Date | undefined {
    const arrivalDate = el.find(this.config.selectors.arrivalDate).text();
    const lines: string[] = splitByLineBreaks(arrivalDate);
    let dateStr: string | undefined;

    if (lines.length === 1) {
      // "Preventa 17/06/21" => 2021-06-17T04:00:00.000Z
      [, dateStr] = lines[0].split(' ');
    } else if (lines[1]) {
      // "Próximo Lanzamiento<br>Llegada Estimada: 17/06/21" => 2021-06-17T04:00:00.000Z
      [, dateStr] = lines[1].split(':');
    }

    if (dateStr) {
      return parseDate(dateStr, this.dateFormat);
    }

    return undefined;
  }

  protected extractConditionId(el: cheerio.Cheerio): number | undefined {
    const { conditions } = this.config;
    const productName: string = this.extractName(el);
    const defaultCondition: Condition = conditions[0];
    const condition: Condition | undefined = conditions.find((item) =>
      item.codes?.find((code) => productName.includes(code))
    );

    return condition?.id || defaultCondition.id;
  }
}
