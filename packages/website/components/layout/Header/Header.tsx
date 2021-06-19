import { Flex, Link, Header as LibHeader } from '@project/ui';
import SearchBar from '../../SearchBar';
import ThemeToggler from '../../ThemeToggler';

export default function Header(): JSX.Element {
  return (
    <LibHeader position="sticky">
      <Flex container alignItems="center" justifyContent="space-between">
        <Flex item>
          <Link href="/">Logo</Link>
        </Flex>
        <Flex item xs={6}>
          <SearchBar />
        </Flex>
        <Flex item>
          <ThemeToggler />
        </Flex>
      </Flex>
    </LibHeader>
  );
}
