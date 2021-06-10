import styles from './Main.module.scss';

export type MainProps = React.ComponentPropsWithoutRef<'main'>;

export default function Main(props: MainProps): JSX.Element {
  const { children, ...rest } = props;

  return (
    <main className={styles.root} {...rest}>
      {children}
    </main>
  );
}
