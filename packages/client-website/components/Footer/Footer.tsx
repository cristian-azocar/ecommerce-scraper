import { FaGithub, FaHeart, FaLinkedin } from 'react-icons/fa';
import { Flex } from '@project/ui';
import styles from './Footer.module.scss';

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.root}>
      Made with <FaHeart color="red" /> by Cristian Azócar
      <Flex container justifyContent="center">
        <Flex item>
          <a
            href="https://github.com/cristian-azocar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </Flex>
        <Flex item>
          <a
            href="https://github.com/cristian-azocar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaLinkedin />
          </a>
        </Flex>
      </Flex>
    </footer>
  );
}
