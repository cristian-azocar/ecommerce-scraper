import { FaGithub, FaHeart, FaLinkedin } from 'react-icons/fa';
import { Flex, Typography, Link } from '@project/ui';
import styles from './Footer.module.scss';

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.root}>
      <Typography variant="body2">
        Made with <FaHeart color="red" /> by Cristian Azócar
      </Typography>
      <Flex
        container
        justifyContent="center"
        spacing={2}
        className={styles['social-links']}
      >
        <Flex item>
          <Link
            href="https://github.com/cristian-azocar"
            aria-label="GitHub"
            external
          >
            <FaGithub />
          </Link>
        </Flex>
        <Flex item>
          <Link
            href="https://www.linkedin.com/in/cristian-azocar/"
            aria-label="LinkedIn"
            external
          >
            <FaLinkedin />
          </Link>
        </Flex>
      </Flex>
    </footer>
  );
}
