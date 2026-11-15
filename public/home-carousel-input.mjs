export function createWheelPager() {
  let total = 0, lastTime = -Infinity, lockedUntil = 0;
  const native = () => { total = 0; return { consume: false, page: null }; };
  return ({ page, pageCount, deltaX = 0, deltaY = 0, deltaMode = 0, viewportHeight = 400, time,
    ctrlKey = false, metaKey = false, shiftKey = false, altKey = false }) => {
    if (![page, pageCount, deltaX, deltaY, time].every(Number.isFinite) || !Number.isInteger(page) || !Number.isInteger(pageCount) || page < 0 || page >= pageCount) return native();
    if (ctrlKey || metaKey || shiftKey || altKey || pageCount < 2 || Math.abs(deltaY) <= Math.abs(deltaX)) return native();
    const direction = Math.sign(deltaY);
    if (!direction || (direction < 0 && page === 0) || (direction > 0 && page === pageCount - 1)) return native();
    if (time < lockedUntil) return { consume: true, page: null };
    if (time - lastTime > 180 || Math.sign(total) !== direction) total = 0;
    const factor = deltaMode === 1 ? 16 : deltaMode === 2 ? Math.max(1, viewportHeight) : 1;
    total += deltaY * factor; lastTime = time;
    if (Math.abs(total) < 70) return { consume: true, page: null };
    total = 0; lockedUntil = time + 500;
    return { consume: true, page: page + direction };
  };
}

export function wheelPageVisible({top,bottom,viewportHeight,topInset=110,bottomInset=16}){
  return [top,bottom,viewportHeight,topInset,bottomInset].every(Number.isFinite)&&bottom>top&&top>=topInset&&bottom<=viewportHeight-bottomInset;
}
