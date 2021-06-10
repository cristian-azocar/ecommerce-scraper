import Head from 'next/head';
import Content from '../components/Content';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css';

export default function Index(): JSX.Element {
  return (
    <Content>
      <Head>
        <title>E-Commerce Scraper</title>
        <meta name="description" content="E-Commerce scraper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello from Index
    </Content>
  );
}
