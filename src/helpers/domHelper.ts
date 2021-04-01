import cheerio from 'cheerio';

export function extractClass(el: cheerio.Cheerio, index: number): string {
  return el.attr('class').split(/\s+/)[index];
}
