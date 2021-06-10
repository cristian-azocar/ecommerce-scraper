import { Flex, Header as LibHeader } from '@project/ui';
import SearchBar from '../SearchBar';
import ThemeToggler from '../ThemeToggler';

export default function Header(): JSX.Element {
  return (
    <LibHeader position="sticky">
      <Flex container alignItems="center">
        <Flex item>Logo</Flex>
        <Flex item grow>
          <SearchBar />
        </Flex>
        <Flex item>
          <ThemeToggler />
        </Flex>
      </Flex>
    </LibHeader>
  );
}
