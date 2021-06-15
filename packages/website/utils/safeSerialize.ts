export default function safeSerialize<T>(value: unknown): T {
  return JSON.parse(JSON.stringify(value));
}
