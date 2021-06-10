import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';
import styles from './Layout.module.scss';

export type LayoutProps = React.ComponentPropsWithoutRef<'div'>;

export default function Layout(props: LayoutProps): JSX.Element {
  const { children, ...rest } = props;

  return (
    <div className={styles.root} {...rest}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
