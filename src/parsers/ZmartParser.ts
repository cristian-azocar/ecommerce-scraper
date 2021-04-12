import IPlatform from 'src/models/IPlatform';
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

    // TODO: use a blacklist of invalid SKUs
    if (sku === 'File') {
      logger.debug('Could not extract the SKU from the image URL');
      return undefined;
    }

    return sku;
  }

  protected extractPlatformId(el: cheerio.Cheerio): number {
    const { platforms } = this.config;
    const platformClass: string = this.extractClass(el, 1);
    const cleanStr: string = platformClass.replace('BorderPlat', '');
    const platform: IPlatform = platforms.find(
      (item) => item.name === cleanStr || item.lookup?.includes(cleanStr)
    );

    // TODO: detect non-game platforms (books, toys, etc)
    return platform?.id;
  }

  protected extractAvailabilityId(el: cheerio.Cheerio): number {
    const { availabilities, selectors } = this.config;
    const str: string = el.find(selectors.availability).text();
    const texts: string[] = str.trim().split(' ');
    const availability = availabilities.find(
      (item) => item.name === texts[0] || item.lookup?.includes(texts[0])
    );

    if (!availability) {
      logger.debug(`The text "${texts[0]}" is not a known availability`);
    }

    return availability?.id;
  }

  protected extractEstimatedArrivalDate(el: cheerio.Cheerio): Date {
    // "Próximo Lanzamiento<br>Llegada Estimada: 17/06/21" => 2021-06-17T04:00:00.000Z
    const estimatedArrival = el
      .find(this.config.selectors.estimatedArrivalDate)
      .text();
    const texts: string[] = splitByLineBreaks(estimatedArrival);

    if (texts[1] === undefined) {
      return undefined;
    }

    return parseDate(texts[1].split(':')[1], this.dateFormat);
  }

  protected extractConditionId(el: cheerio.Cheerio): number {
    const { conditions } = this.config;
    const productName: string = this.extractName(el);
    const defaultCondition: ICondition = conditions[0];
    const condition: ICondition = conditions.find((item) =>
      item.lookup?.find((lookupItem) => productName.includes(lookupItem))
    );

    return condition?.id || defaultCondition.id;
  }
}
