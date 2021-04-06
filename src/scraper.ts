import puppeteer, { Browser } from 'puppeteer';

(async () => {
  const browser: Browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://www.zmart.cl/Scripts/prodSearch.asp?strSearch=final+fantasy+vii'
  );
  await page.waitForSelector('.BoxProductoS2');
  const products = await page.$$eval('.BoxProductoS2', (elements) =>
    elements.map((el) => {
      const descriptionDiv = el.querySelector('.BoxProductoS2_Descripcion');
      const pricesDiv = el.querySelector('.BoxProductoS2_Precios');

      const link = descriptionDiv.querySelector('a');
      const price = (pricesDiv.querySelector('.BoxProductoS2_Precio') || {})
        .textContent;
      const normalPrice = (
        pricesDiv.querySelector('.BoxProductoS2_PrecioNormal') || {}
      ).textContent;
      const discount = (
        pricesDiv.querySelector('.BoxProductoS2_PrecioDescto') || {}
      ).textContent;
      const availability = (
        pricesDiv.querySelector('.BoxProductoS2_Disponibilidad') || {}
      ).textContent;

      return {
        name: link.textContent,
        url: link.href,
        price: price && Number(price.replace(/[^0-9]+/g, '')),
        normalPrice,
        discount,
        availability: availability.trim(),
      };
    })
  );

  console.log(products);

  await browser.close();
})();
