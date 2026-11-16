import {connectSolutionLab} from './solution-lab.mjs';

export function connectFolderPanel(root, choose) {
  const nav = root.querySelector('.solution-workspace .home-folder-grid');
  const panel = root.querySelector('#solution-panel');
  if (!nav || !panel) return () => {};

  const tabs = Array.from(nav.querySelectorAll('.home-folder-link'));
  const active = tabs.find(tab => tab.getAttribute('aria-current') === 'page');
  if (!active) return () => {};
  const disconnectLab = connectSolutionLab(panel);

  nav.setAttribute('role','tablist');
  tabs.forEach((tab,index) => {
    tab.id = 'solution-folder-' + index;
    tab.setAttribute('role','tab');
    tab.setAttribute('aria-controls',panel.id);
    tab.setAttribute('aria-selected',String(tab === active));
    tab.tabIndex = tab === active ? 0 : -1;
  });
  panel.tabIndex = 0;
  panel.setAttribute('role','tabpanel');
  panel.setAttribute('aria-labelledby',active.id);

  function click(event) {
    const tab = event.target.closest?.('.home-folder-link');
    if (!tab || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (tab !== active) choose(tab);
  }

  function keys(event) {
    const index = tabs.indexOf(event.target);
    if (index < 0 || event.metaKey || event.ctrlKey || event.altKey) return;
    const rtl = nav.ownerDocument.documentElement.dir === 'rtl';
    let target;
    switch(event.key) {
      case 'Home': target = 0; break;
      case 'End': target = tabs.length - 1; break;
      case 'ArrowLeft': target = index + (rtl ? 1 : -1); break;
      case 'ArrowRight': target = index + (rtl ? -1 : 1); break;
      case 'ArrowUp':
      case 'ArrowDown':
        if (tabs[0].offsetTop === tabs[tabs.length-1].offsetTop) return;
        target = index + (event.key === 'ArrowUp' ? -2 : 2); break;
      case ' ': target = index; break;
      default: return;
    }
    event.preventDefault();
    const tab = tabs[(target + tabs.length) % tabs.length];
    tab.focus({preventScroll:true});
    tab.click();
  }
  nav.addEventListener('click',click);
  nav.addEventListener('keydown',keys);
  return () => {
    nav.removeEventListener('click',click);
    nav.removeEventListener('keydown',keys);
    disconnectLab();
  };
}
