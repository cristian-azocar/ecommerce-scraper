/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
export default function setupDotenv(): void {
  const findConfig = require('find-config');
  const dotenv = require('dotenv');

  dotenv.config({ path: findConfig('.env') ?? undefined });
}
