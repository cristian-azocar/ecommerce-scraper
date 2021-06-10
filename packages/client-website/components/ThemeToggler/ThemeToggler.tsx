import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { IconButton } from '@project/ui';

export default function ThemeToggler(): JSX.Element {
  const [icon, setIcon] = useState(getIcon);

  function getIcon(): JSX.Element {
    return getCurrentTheme() === 'dark' ? <FaSun /> : <FaMoon />;
  }

  function getCurrentTheme(): string | undefined {
    return typeof window !== 'undefined'
      ? document.body.dataset.theme
      : undefined;
  }

  function toggleTheme(): void {
    const newTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = newTheme;
    setIcon(getIcon);
  }

  return <IconButton onClick={toggleTheme}>{icon}</IconButton>;
}
