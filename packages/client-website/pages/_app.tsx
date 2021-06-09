import '../styles/globals.css';
import '@project/ui/src/core/index.scss'; // TODO: import a minified and CSS version
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
export default MyApp;
