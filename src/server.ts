import app from './app';
import config from './config';

app.listen(config.port, (): void => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${config.port}`);
});
