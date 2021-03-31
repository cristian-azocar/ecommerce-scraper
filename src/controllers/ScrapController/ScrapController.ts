import { Request, Response } from 'express';
import { IProduct } from 'src/types/interfaces';
import ScrapService from '../../services/ScrapService';
// import redisStorage from '../../storage/RedisStorage';

export default class ScrapController {
  private scrapService: ScrapService = new ScrapService();

  constructor() {
    this.scrap = this.scrap.bind(this);
  }

  async scrap(req: Request, res: Response): Promise<void> {
    const { name } = req.query;
    const products: IProduct[] = await this.scrapService.scrap(name.toString());

    // await redisStorage.set(`COORDINATES:${lat},${lng}`, weather);

    res.json(products);
  }
}
