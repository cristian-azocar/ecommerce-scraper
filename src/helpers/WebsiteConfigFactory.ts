import websiteConfigs from 'src/config/website-configs';
import { Website } from 'src/types/enums';
import { IWebsiteConfig } from 'src/types/interfaces';

export default class WebsiteConfigFactory {
  static getConfig(website: Website): IWebsiteConfig {
    if (website in websiteConfigs) {
      return websiteConfigs[website];
    }

    throw new Error(`The website ${website} has no config implemented`);
  }
}
