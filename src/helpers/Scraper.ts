/* eslint-disable no-await-in-loop */
import axios from 'axios';
import querystring from 'querystring';
import { IProduct, IScrapeOptions, IScrapeResult } from 'src/types/interfaces';
import { sleep } from 'src/utils';

export default class Scraper {
  // TODO: save the html on Redis for X minutes to speed up the process
  // It's unlikely that the pages will update very often
  async scrape(options: IScrapeOptions): Promise<IProduct[]> {
    const { url, parser } = options;
    const products: IProduct[] = [];
    let page = 1;
    let result: IScrapeResult;
    let formData: string;

    do {
      formData = this.buildFormData(page);

      console.log(`Scraping ${url}?${formData}`);

      const { data } = await axios.post(url, formData);
      result = parser.parse(data);

      page += 1;
      products.push(...result.products);

      await sleep(500);
    } while (result.morePages);

    console.log('Done scraping');

    return products;
  }

  // TODO: move this logic to parser maybe?
  // Also, 321 is hardcoded, it should be dynamic by platform (PS4 = 321)
  private buildFormData(page: number): string {
    return querystring.stringify({
      id: 321,
      idRowVar: 32641,
      idRow: 2997,
      curPage: page,
    });
  }
}
