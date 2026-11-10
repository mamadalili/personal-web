export async function loadArticleData(source, {signal, fetcher = fetch, base = import.meta.url} = {}) {
  if (!/^assets\/posts\/[a-z0-9]+(?:-[a-z0-9]+)*-[a-f0-9]{16}\.json$/.test(source || '')) throw new Error('Invalid article data path');
  const url = new URL(source, base);
  for (let attempt = 0; ; attempt++) {
    let response;
    try {
      response = await fetcher(url, {signal, ...(attempt ? {cache:'reload'} : {})});
      if (!response.ok) throw new Error(`Article data could not be loaded (${response.status})`);
      return await response.json();
    } catch (error) {
      if (signal?.aborted || attempt || (response && ![408,429,500,502,503,504].includes(response.status))) throw error;
      await new Promise(resolve => setTimeout(resolve, 300));
      signal?.throwIfAborted();
    }
  }
}
