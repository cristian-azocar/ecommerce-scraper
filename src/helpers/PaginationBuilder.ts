import querystring from 'querystring';
import { Website } from 'src/types/enums';

const builders: Record<Website, (page: number) => string> = {
  [Website.Zmart]: (page: number) =>
    querystring.stringify({
      id: 321,
      idRowVar: 32641,
      idRow: 2997,
      curPage: page,
    }),
};

export default class PaginationBuilder {
  private website: Website;

  constructor(website: Website) {
    if (!(website in builders)) {
      throw new Error(`Website ${website} not implemented`);
    }

    this.website = website;
  }

  build(page: number): string {
    return builders[this.website](page);
  }
}
