import { Flex, Typography, Button } from '@project/ui';
import { FaGithub } from 'react-icons/fa';
import Emoji from '../components/Emoji';
import Content from '../components/layout/Content';
import styles from '../styles/Index.module.scss';

export default function Index(): JSX.Element {
  return (
    <Content>
      <Flex
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        className={styles.grid}
      >
        <Flex item>
          <Typography className={styles.title}>E-Commerce Scraper</Typography>
        </Flex>
        <Flex item>
          <Typography variant="h5">
            Hello there! <Emoji>👋</Emoji>
          </Typography>
          <Typography variant="h5">
            Search for a video game to see the scraper results <Emoji>👆</Emoji>
          </Typography>
        </Flex>
        <Flex item>
          <Button
            href="https://github.com/cristian-azocar/ecommerce-scraper"
            target="_blank"
            size="xl"
            leftIcon={<FaGithub />}
          >
            GitHub
          </Button>
        </Flex>
      </Flex>
    </Content>
  );
}
