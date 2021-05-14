import type { PartialDeep } from 'type-fest';
import type { Theme } from './theme';

const darkTheme: PartialDeep<Theme> = {
  colors: {
    background: '#202124',
    text: {
      primary: '#e8eaed',
      secondary: '#9aa0a6',
      disabled: 'rgba(232, 234, 237, .38)',
    },
  },
};

export default darkTheme;
