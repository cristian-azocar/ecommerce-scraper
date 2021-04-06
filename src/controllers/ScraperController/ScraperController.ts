import { Request, Response } from 'express';
import { IProduct } from 'src/types/interfaces';
import Scraper from 'src/helpers/Scraper';
import ZmartParser from 'src/parsers/ZmartParser';
// import redisStorage from '../../storage/RedisStorage';

// TODO: save this URL in a config file
const baseUrl = 'https://www.zmart.cl';
const scraper: Scraper = new Scraper();
const zmartParser: ZmartParser = new ZmartParser(baseUrl);

export default class ScraperController {
  async scrape(req: Request, res: Response): Promise<void> {
    const { name, platform } = req.query;
    // const url = `${baseUrl}/Scripts/prodSearch.asp?strSearch=${name}&chkOptionSearch=${platform}`;
    // TODO: scrape each platform
    // TODO: scrape "Próximamente" catalog
    // TODO: scrape "Usados" catalog
    const url = `${baseUrl}/scripts/proddisplay_page.asp`;
    const products: IProduct[] = await scraper.scrape({
      url,
      parser: zmartParser,
    });

    // await redisStorage.set(`COORDINATES:${lat},${lng}`, weather);

    res.json(products);
  }
}
