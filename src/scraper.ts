import puppeteer, { Browser } from 'puppeteer';

(async () => {
  const browser: Browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://www.zmart.cl/Scripts/prodSearch.asp?strSearch=final+fantasy+vii'
  );
  await page.waitForSelector('.ProdBox146');
  const products = await page.$$eval('.ProdBox146', (elements) =>
    elements.map((el) => {
      const descriptionDiv = el.querySelector('.ProdBox146_Descripcion');
      const pricesDiv = el.querySelector('.ProdBox146_Precios');

      const link = descriptionDiv.querySelector('a');
      const price = (pricesDiv.querySelector('.ProdBox146_Precio') || {})
        .textContent;
      const normalPrice = (
        pricesDiv.querySelector('.ProdBox146_PrecioNormal') || {}
      ).textContent;
      const discount = (
        pricesDiv.querySelector('.ProdBox146_PrecioDescto') || {}
      ).textContent;
      const availability = (
        pricesDiv.querySelector('.ProdBox146_Disponibilidad') || {}
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
