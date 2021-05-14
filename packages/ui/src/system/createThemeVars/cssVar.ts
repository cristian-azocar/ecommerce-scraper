export interface CssVar {
  variable: string;
  reference: string;
}

export function cssVar(name: string): CssVar {
  return {
    variable: `--${name}`,
    reference: `var(--${name})`,
  };
}
