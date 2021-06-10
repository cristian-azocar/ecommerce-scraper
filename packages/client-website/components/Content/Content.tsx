import styles from './Content.module.scss';

export type ContentProps = React.ComponentPropsWithoutRef<'div'>;

export default function Content(props: ContentProps): JSX.Element {
  const { children, ...rest } = props;

  return (
    <div className={styles.root} {...rest}>
      {children}
    </div>
  );
}
