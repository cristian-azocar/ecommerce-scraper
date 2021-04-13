export default function isUrlAbsolute(url: string): boolean {
  const regexp = new RegExp('^([a-z]+://|//)', 'i');

  return regexp.test(url);
}
