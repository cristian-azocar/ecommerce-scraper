import clsx from 'clsx';
import Head from 'next/head';
import styles from './Content.module.scss';

export interface ContentProps extends React.ComponentPropsWithoutRef<'div'> {
  title?: string;
}

export default function Content(props: ContentProps): JSX.Element {
  const { children, className, title = 'E-Commerce Scraper', ...rest } = props;
  const classes = clsx([styles.root], className);

  return (
    <div className={classes} {...rest}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="E-Commerce scraper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
}
