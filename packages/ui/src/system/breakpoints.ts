export interface BreakpointValues {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Breakpoints extends BreakpointValues {
  up: (breakpoint: keyof BreakpointValues) => string;
  down: (breakpoint: keyof BreakpointValues) => string;
}

const values: BreakpointValues = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
};

function up(breakpoint: keyof BreakpointValues): string {
  return `@media screen and (min-width: ${values[breakpoint]})`;
}

function down(breakpoint: keyof BreakpointValues): string {
  return `@media screen and (max-width: ${values[breakpoint]})`;
}

const breakpoints: Breakpoints = {
  ...values,
  up,
  down,
};

export default breakpoints;
