import axios from 'axios';
import cheerio from 'cheerio';
import { Availability, Platform } from 'src/types/enums';
import { IProduct } from 'src/types/interfaces';
// import puppeteer, { Browser } from 'puppeteer';

const baseUrl = 'https://www.zmart.cl';
const productElementId = '.ProdBox146';

export default class ScrapService {
  async scrap(name: string): Promise<IProduct[]> {
    const { data } = await axios.get(
      `${baseUrl}/Scripts/prodSearch.asp?strSearch=${name}`
    );
    const $ = cheerio.load(data);
    const products: IProduct[] = [];

    $(productElementId).each((_, el) => {
      const className = $(el).attr('class').split(/\s+/)[1];
      const description = $(el).find('.ProdBox146_Descripcion');
      const prices = $(el).find('.ProdBox146_Precios');

      const link = description.find('a');
      const price = prices.find('.ProdBox146_Precio').text();
      const normalPrice = prices.find('.ProdBox146_PrecioNormal').text();
      const discount = prices.find('.ProdBox146_PrecioDescto').text();
      const availability = prices.find('.ProdBox146_Disponibilidad').text();

      products.push({
        name: link.text(),
        platform: this.toPlatform(className),
        url: `${baseUrl}${link.attr('href')}`,
        price: this.normalizePrice(price),
        normalPrice: this.normalizePrice(normalPrice),
        discount: this.normalizePrice(discount),
        availability: this.toAvailability(availability.trim()),
      });
    });

    return products;
  }

  private toPlatform(str: string): Platform {
    const cleanStr = str.startsWith('BorderPlat')
      ? str.replace('BorderPlat', '')
      : str;

    if (cleanStr in Platform) {
      return Platform[cleanStr as keyof typeof Platform];
    }

    switch (cleanStr) {
      case 'BLR':
        return Platform.BluRay;
      case 'PSV':
        return Platform.PSVita;
      case 'WII':
        return Platform.Wii;
      case 'WIIU':
        return Platform.WiiU;
      case 'NDS':
        return Platform.DS;
      case 'NSW':
        return Platform.Switch;
      case 'XBONE':
        return Platform.XboxOne;
      case 'XB360':
        return Platform.Xbox360;
      default:
        return Platform.Unknown;
    }
  }

  private normalizePrice(str: string): number {
    return Number(str.replace(/[^0-9]+/g, '')) || 0;
  }

  private toAvailability(str: string): Availability {
    if (str.includes('Preventa')) {
      return Availability.Presale;
    }

    if (str.includes('Próximo Lanzamiento')) {
      return Availability.UpcomingRelease;
    }

    switch (str) {
      case 'Disponible':
        return Availability.Available;
      case 'Agotado':
        return Availability.OutOfStock;
      default:
        return Availability.Unknown;
    }
  }

  // async scrap(name: string): Promise<any> {
  //   const browser: Browser = await puppeteer.launch();
  //   const page = await browser.newPage();

  //   await page.goto(
  //     `https://www.zmart.cl/Scripts/prodSearch.asp?strSearch=${name}`
  //   );
  //   await page.waitForSelector('.ProdBox146');

  //   const products = await page.$$eval('.ProdBox146', (elements) =>
  //     elements.map((el) => {
  //       const descriptionDiv = el.querySelector('.ProdBox146_Descripcion');
  //       const pricesDiv = el.querySelector('.ProdBox146_Precios');

  //       const link = descriptionDiv.querySelector('a');
  //       const price = (pricesDiv.querySelector('.ProdBox146_Precio') || {})
  //         .textContent;
  //       const normalPrice = (
  //         pricesDiv.querySelector('.ProdBox146_PrecioNormal') || {}
  //       ).textContent;
  //       const discount = (
  //         pricesDiv.querySelector('.ProdBox146_PrecioDescto') || {}
  //       ).textContent;
  //       const availability = (
  //         pricesDiv.querySelector('.ProdBox146_Disponibilidad') || {}
  //       ).textContent;

  //       return {
  //         name: link.textContent,
  //         url: link.href,
  //         price: price && Number(price.replace(/[^0-9]+/g, '')),
  //         normalPrice,
  //         discount,
  //         availability: availability.trim(),
  //       };
  //     })
  //   );

  //   await browser.close();

  //   return products;
  // }
}
