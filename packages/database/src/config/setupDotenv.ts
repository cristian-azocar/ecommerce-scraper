/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';

export default function setupDotenv(): void {
  const envPath = path.resolve(__dirname, `../../../../.env`);
  require('dotenv').config({ path: envPath });
}
