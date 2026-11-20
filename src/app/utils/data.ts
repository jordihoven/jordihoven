// single entry point for all entity data, change how entities load here
export async function getData<T>(fn: string): Promise<T> {
  const res = await fetch(`/.netlify/functions/${fn}`);
  if (!res.ok) throw new Error(`${fn} failed: ${res.status}`);
  return res.json();
}
