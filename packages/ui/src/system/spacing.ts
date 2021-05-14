export type Spacing = (value: number) => string;

const minValue = 0;
const maxValue = 96;
const scale = 4;

export default function spacing(value: number): string {
  if (value < minValue || value > maxValue) {
    throw new Error(`Value must a number between ${minValue} and ${maxValue}`);
  }

  return `${value * scale}px`;
}
