import { IConfig } from '../types';

const config: IConfig = {
  port: +process.env.PORT || 3001,
  retails: [],
  availabilities: [],
  conditions: [],
  categories: [],
};

export default config;
