import { HTTPMethod, Website } from 'src/types/enums';
import Scraper from 'src/helpers/Scraper';
import ZmartParser from 'src/parsers/ZmartParser';

// TODO: read the URL from a config file
const scraperInstances: Record<Website, Scraper> = {
  [Website.Zmart]: new Scraper({
    url: 'https://www.zmart.cl/scripts/proddisplay_page.asp',
    parser: new ZmartParser(),
    httpMethod: HTTPMethod.Post,
    pagination: { queryString: 'curPage' },
  }),
};

export default scraperInstances;
