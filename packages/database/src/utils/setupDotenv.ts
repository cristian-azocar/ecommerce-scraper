/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import path from 'path';

export default function setupDotenv(): void {
  const dotenv = require('dotenv');
  const envPath = path.resolve(__dirname, `../../../../.env`);

  dotenv.config({ path: envPath });
}
