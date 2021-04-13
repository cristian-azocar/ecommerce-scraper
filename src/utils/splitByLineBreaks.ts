export default function splitByLineBreaks(s: string): string[] {
  return s
    .trim()
    .replace(/\t/g, '')
    .split(/\r\n|\r|\n/);
}
