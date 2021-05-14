import { walkObject } from '@project/utils';
import type { Theme } from '../theme';
import { cssVar } from './cssVar';

export interface CssMap {
  value: string | number;
  variable: string;
  reference: string;
}

export interface ThemeVars {
  cssVars: Record<string, string | number>;
  cssMap: Record<string, CssMap>;
}

export default function createThemeVars(theme: Theme): ThemeVars {
  const themeVars: ThemeVars = {
    cssMap: {},
    cssVars: {},
  };

  walkObject(theme, (value: unknown, path: string[]): void => {
    if (typeof value === 'string' || typeof value === 'number') {
      const { cssVars, cssMap } = buildThemeVar(path, value);

      themeVars.cssVars = { ...themeVars.cssVars, ...cssVars };
      themeVars.cssMap = { ...themeVars.cssMap, ...cssMap };
    }
  });

  return themeVars;
}

function buildThemeVar(keys: string[], value: string | number): ThemeVars {
  const varKey: string = keys.join('-');
  const lookupKey: string = keys.join('.');
  const { variable, reference } = cssVar(varKey);

  return {
    cssVars: {
      [variable]: value,
    },
    cssMap: {
      [lookupKey]: { value, variable, reference },
    },
  };
}
