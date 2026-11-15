const labels = ['present','size','ribbon','direction'];
export const shotChecks = Object.freeze(labels);

export function shotReview(fixes = []) {
  const selected = new Set(Array.isArray(fixes) ? fixes.filter(key => labels.includes(key)) : []);
  return {
    first:{present:selected.has('present'),x:28,width:26,ribbon:true},
    last:{present:true,x:selected.has('direction')?72:18,width:selected.has('size')?26:36,ribbon:selected.has('ribbon')},
    unresolved:labels.filter(key => !selected.has(key)),
    aligned:labels.every(key => selected.has(key))
  };
}

export function shotReviewSheet(fixes, language = 'fa') {
  const state = shotReview(fixes), fa = language !== 'en';
  const names = fa ? ['وجود جعبه از ابتدا','اندازهٔ ثابت','روبان قرمز ثابت','حرکت به راستِ تصویر'] : ['Box present from the start','Consistent size','Consistent red ribbon','Movement toward screen-right'];
  return (fa ? 'بررسی آموزشی یک نما؛ تحلیل فایل واقعی نیست.\n\n' : 'Educational shot review; no real file was analysed.\n\n') + labels.map((key,i) => `${names[i]}: ${state.unresolved.includes(key)?(fa?'هنوز ناهماهنگ':'still inconsistent'):(fa?'در این مثال هماهنگ':'aligned in this example')}`).join('\n') + (fa ? '\n\nکار بعدی: بررسی حرکت واقعی، تغییر شکل، صدا و اتصال به نمای بعد. هماهنگی این چهار مورد، کیفیت ویدیو را تضمین نمی‌کند.\n' : '\n\nNext: review real motion, deformation, audio and the cut to the next shot. These four checks do not guarantee video quality.\n');
}
