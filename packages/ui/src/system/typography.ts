export interface TypographyVariant {
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: string;
}

export interface Typography {
  fontFamily: string;
  fontSize: string;
  fontWeights: {
    thin: number;
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  h1: TypographyVariant;
  h2: TypographyVariant;
  h3: TypographyVariant;
  h4: TypographyVariant;
  h5: TypographyVariant;
  h6: TypographyVariant;
  body1: TypographyVariant;
  body2: TypographyVariant;
  button: TypographyVariant;
}

function createVariant(
  fontSize: string,
  fontWeight: number,
  lineHeight: number,
  letterSpacing: string
): TypographyVariant {
  return {
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
  };
}

const fontWeights: Typography['fontWeights'] = {
  thin: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const typography: Typography = {
  fontFamily: '"Inter", sans-serif',
  fontSize: '16px',
  fontWeights,
  h1: createVariant('6rem', fontWeights.light, 1.167, '-0.01562em'),
  h2: createVariant('3.75rem', fontWeights.light, 1.2, '-0.00833em'),
  h3: createVariant('3rem', fontWeights.regular, 1.167, '0em'),
  h4: createVariant('2.125rem', fontWeights.regular, 1.235, '0.00735em'),
  h5: createVariant('1.5rem', fontWeights.regular, 1.334, '0em'),
  h6: createVariant('1.25rem', fontWeights.medium, 1.6, '0.0075em'),
  body1: createVariant('1rem', fontWeights.regular, 1.5, 'normal'),
  body2: createVariant('0.875rem', fontWeights.regular, 1.43, '0.01071em'),
  button: createVariant('1rem', fontWeights.semibold, 1.2, 'normal'),
};

export default typography;
