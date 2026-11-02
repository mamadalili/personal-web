export async function loadArticleData(source, {signal, fetcher = fetch, base = import.meta.url} = {}) {
  if (!/^assets\/posts\/[a-z0-9]+(?:-[a-z0-9]+)*-[a-f0-9]{16}\.json$/.test(source || '')) throw new Error('Invalid article data path');
  const response = await fetcher(new URL(source, base), {signal});
  if (!response.ok) throw new Error(`Article data could not be loaded (${response.status})`);
  return response.json();
}
