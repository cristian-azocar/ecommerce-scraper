/* eslint-disable import/no-extraneous-dependencies */
import findConfig from 'find-config';
import dotenv from 'dotenv';

export default function setupDotenv(): void {
  dotenv.config({ path: findConfig('.env') ?? undefined });
}
