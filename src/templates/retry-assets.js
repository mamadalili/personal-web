    document.addEventListener('error', event => {
      const asset = event.target;
      const script = asset.tagName === 'SCRIPT' && asset.src;
      const style = asset.tagName === 'LINK' && asset.rel === 'stylesheet';
      if ((!script && !style) || asset.parentNode !== document.head) return;
      const url = new URL(script ? asset.src : asset.href);
      const attempt = Number(asset.dataset.loadAttempt || 0) + 1;
      if (url.origin !== location.origin || attempt > 2) return;
      setTimeout(() => {
        if (!asset.isConnected) return;
        const next = document.createElement(script ? 'script' : 'link');
        for (const {name, value} of asset.attributes) next.setAttribute(name, value);
        next.dataset.loadAttempt = String(attempt);
        url.searchParams.set('retry', String(Date.now()));
        next[script ? 'src' : 'href'] = url.href;
        const replace = () => asset.replaceWith(next);
        if (script && asset.defer && document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', replace, {once:true});
        } else replace();
      }, attempt * 500);
    }, true);
