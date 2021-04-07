import { IConfig } from '../types/interfaces';

const config: IConfig = {
  port: +process.env.PORT || 3001,
};

export default config;
