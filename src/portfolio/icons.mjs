export const skillIconPaths={ai:'<rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 3v3m6-3v3m-6 12v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3M9 10h6m-6 4h4"/>',sales:'<path d="M3 4h2l2 12h11l3-8H6M9 20h.01M17 20h.01"/>',market:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18M12 3c-5 5-5 13 0 18"/>',marketing:'<path d="m3 11 18-7v16L3 14Zm5 5 1 5h4l-2-4M3 11v3"/>',ads:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',analytics:'<path d="M4 3v17h17M8 15l4-5 4 3 5-7"/>',web:'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18m-10 4-3 2 3 2m4-4 3 2-3 2"/>'};

export const skillIcon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${skillIconPaths[name]}</svg>`;

export const iconPaths={solutions:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',blog:'<path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4Zm0 11h12a4 4 0 0 1 4 4M8 8h8M8 11h5"/>',cv:'<rect x="4" y="3" width="16" height="18" rx="3"/><circle cx="10" cy="9" r="2"/><path d="M7 15c0-3 6-3 6 0m3-7h1m-1 4h1M7 18h10"/>',contact:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>'};

export const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;

Object.assign(iconPaths,{
 phone:'<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z"/>',
 whatsapp:'<path d="m4 20 1-4a9 9 0 1 1 3 3l-4 1Z"/><path d="M9 7.5 8 9c.6 3 3 5.4 6 6l1.5-1-2-2-1 1c-1.3-.5-2.2-1.4-2.7-2.7l1-1-1.8-1.8Z"/>',
 telegram:'<path d="m3 10 18-7-4 18-6-6-4 3 1-6 9-6-6 9M3 10l5 2"/>',
 github:'<path d="M9 21v-4c-3 .7-3-1.5-4-2m10 6v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 5-1.6 5-5a4 4 0 0 0-1-2.8 4 4 0 0 0 0-3.5s-1.2-.4-4 1a13 13 0 0 0-6 0C5.2 2.6 4 3 4 3a4 4 0 0 0 0 3.5 4 4 0 0 0-1 2.8c0 3.4 1.7 4.6 5 5A3.5 3.5 0 0 0 7 17v4"/>'
});
