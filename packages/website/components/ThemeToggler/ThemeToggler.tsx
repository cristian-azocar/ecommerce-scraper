import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { IconButton } from '@project/ui';

export default function ThemeToggler(): JSX.Element | null {
  const [activeTheme, setActiveTheme] = useState<string | undefined>();
  const [icon, setIcon] = useState<JSX.Element>();

  useEffect(() => {
    const initialTheme = document.body.dataset.theme;

    setActiveTheme(initialTheme);
    setIcon(getIcon(initialTheme));
  }, []);

  function toggleTheme(): void {
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

    document.body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);

    setActiveTheme(newTheme);
    setIcon(getIcon(newTheme));
  }

  function getIcon(theme: string | undefined): JSX.Element {
    return theme === 'dark' ? <FaSun /> : <FaMoon />;
  }

  return <IconButton onClick={toggleTheme}>{icon}</IconButton>;
}
