import axios from 'axios';
import cheerio from 'cheerio';

export async function fetchHtml(url: string): Promise<cheerio.Root> {
  const { data } = await axios.get(url);

  return cheerio.load(data);
}

export function extractClass(el: cheerio.Cheerio, index: number): string {
  return el.attr('class').split(/\s+/)[index];
}

export function findAndExtractText(
  el: cheerio.Cheerio,
  selector: string
): string {
  return el.find(selector).text();
}
