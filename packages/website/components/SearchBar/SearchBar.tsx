import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';
import { Input, InputGroup, InputAdornment } from '@project/ui';
import { QUERY_KEY } from '../../constants';

export type SearchBarProps = React.ComponentPropsWithoutRef<'div'>;

export default function SearchBar(props: SearchBarProps): JSX.Element {
  const router = useRouter();

  return (
    <form action="/search">
      <InputGroup {...props}>
        <InputAdornment position="left">
          <FaSearch />
        </InputAdornment>
        <Input
          placeholder="Search..."
          type="text"
          name="q"
          defaultValue={router.query[QUERY_KEY]}
        />
      </InputGroup>
    </form>
  );
}
