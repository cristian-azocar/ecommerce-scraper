import { Input, InputGroup, InputAdornment } from '@project/ui';
import { FaSearch } from 'react-icons/fa';

export type SearchBarProps = React.ComponentPropsWithoutRef<'div'>;

export default function SearchBar(props: SearchBarProps): JSX.Element {
  return (
    <form action="/search">
      <InputGroup {...props}>
        <InputAdornment position="left">
          <FaSearch />
        </InputAdornment>
        <Input placeholder="Search..." type="text" name="q" />
      </InputGroup>
    </form>
  );
}
