import { Input, InputGroup, InputAdornment } from '@project/ui';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar(): JSX.Element {
  return (
    <InputGroup>
      <InputAdornment position="left">
        <FaSearch />
      </InputAdornment>
      <Input placeholder="Search..." type="text" name="q" />
    </InputGroup>
  );
}
