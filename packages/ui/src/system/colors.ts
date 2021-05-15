export interface Colors {
  background: string;
  black: string;
  white: string;
  primary: string;
  secondary: string;
  error: string;
  warning: string;
  info: string;
  success: string;
  danger: string;
  gray: {
    50: string;
    200: string;
    500: string;
    700: string;
    900: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
}

const colors: Colors = {
  background: '#fff',
  black: '#000',
  white: '#fff',
  primary: '#3182ce',
  secondary: '#f50057',
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',
  success: '#4caf50',
  danger: '#f14668',
  gray: {
    50: '#f7Fafc',
    200: '#e2e8f0',
    500: '#718096',
    700: '#2d3748',
    900: '#171923',
  },
  text: {
    primary: '#4a4a4a',
    secondary: '#e2e8f0',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
};

export default colors;
