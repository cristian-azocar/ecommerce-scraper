import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '@project/ui/src/core/index.scss';
import Layout from '../components/layout/Layout';
import { store } from '../store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
export default MyApp;
