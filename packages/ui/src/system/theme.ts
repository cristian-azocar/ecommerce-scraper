import { RecursiveKeyOf } from '@project/utils';
import breakpoints, { Breakpoints } from './breakpoints';
import colors, { Colors } from './colors';
import typography, { Typography } from './typography';
import spacing, { Spacing } from './spacing';
import shape, { Shape } from './shape';
import shadow, { Shadow } from './shadow';
import createThemeVars, { ThemeVars } from './createThemeVars';

export interface Theme {
  breakpoints: Breakpoints;
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  shape: Shape;
  shadow: Shadow;
}

const theme: Theme = {
  breakpoints,
  colors,
  typography,
  spacing,
  shape,
  shadow,
};

export const themeVars: ThemeVars = createThemeVars(theme);

export function getCssVar(key: RecursiveKeyOf<Theme>): string {
  return themeVars.cssMap[key].reference;
}

export default theme;
