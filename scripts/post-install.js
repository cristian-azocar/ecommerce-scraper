#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv === 'development') {
  const cwd = process.cwd();
  const envPath = path.join(cwd, '.env');
  const envExamplePath = path.join(cwd, '.env.example');

  if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
  }
}
