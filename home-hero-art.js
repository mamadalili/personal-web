'use strict';

// Decorative, local SVG materials. Copy and destinations stay in portfolio.js.
const homePortalArt = (() => {
 let serial = 0;
 const compositions = {
  strategy: id => `<g class="portal-sculpture">
   <path d="M-57 377C-26 210 254 279 267 89S53-78 84 75s256 144 251 305" fill="none" stroke="url(#${id}-metal)" stroke-width="83"/>
   <path d="M-57 358C-26 191 237 260 250 79S70-66 101 75s249 157 234 305" fill="none" stroke="url(#${id}-edge)" stroke-width="3"/>
   <ellipse cx="142" cy="170" rx="89" ry="143" transform="rotate(36 142 170)" fill="none" stroke="url(#${id}-metal)" stroke-width="43"/>
   <ellipse cx="142" cy="170" rx="68" ry="122" transform="rotate(36 142 170)" fill="none" stroke="url(#${id}-edge)" stroke-width="1.5"/>
   <path d="M20 212C43 106 142 33 224 45" fill="none" stroke="#d7edff" stroke-opacity=".65" stroke-width="2"/>
  </g><g class="portal-fine-lines" fill="none" stroke="#e0e6ff" stroke-opacity=".18">${Array.from({length:9},(_,i)=>`<ellipse cx="147" cy="173" rx="${111+i*9}" ry="${174+i*10}" transform="rotate(36 147 173)"/>`).join('')}</g>`,
  execution: id => `<g class="portal-sculpture">
   <path d="M-90-83C295-77 53 140 305 205L357 301C-51 198 258 32-88 31Z" fill="url(#${id}-metal)"/>
   <path d="M-73-10C213-8 18 183 318 263" fill="none" stroke="url(#${id}-edge)" stroke-width="2.5"/>
   <path d="M-80 168C133 123 112 350 342 284L374 380C68 477 170 248-80 272Z" fill="url(#${id}-metal)"/>
   <path d="M-73 219C133 163 112 393 350 329" fill="none" stroke="url(#${id}-edge)" stroke-width="3"/>
   <path d="M65-39C269 63 94 197 267 259" fill="none" stroke="#dfff9f" stroke-opacity=".72" stroke-width="2"/>
  </g><g class="portal-fine-lines" fill="none" stroke="#c3ffdc" stroke-opacity=".25">${Array.from({length:12},(_,i)=>`<path d="M-50 ${112+i*7}C156 ${20+i*10} 69 ${306+i*6} 352 ${209+i*7}"/>`).join('')}</g>`,
  technology: id => `<g class="portal-sculpture">
   <path d="M-52-17 255 37 140 219-100 139Z" fill="url(#${id}-metal)"/>
   <path d="m255 37 69 109-82 161-102-88Z" fill="url(#${id}-dark)"/>
   <path d="M-52 169 140 89 355 274 142 358Z" fill="url(#${id}-metal)"/>
   <path d="m-52 169 194 189 213-84-112 167L66 458-89 293Z" fill="url(#${id}-dark)"/>
   <path d="m-52 169 194 189 213-84M-52-17 255 37 140 219" fill="none" stroke="url(#${id}-edge)" stroke-width="2"/>
   <path d="M-47 148C39 105 98 63 139 92S303 245 355 274" fill="none" stroke="#f6f2ff" stroke-opacity=".7" stroke-width="2"/>
  </g><g class="portal-fine-lines" fill="none" stroke="#c4c7ff" stroke-opacity=".24">${Array.from({length:12},(_,i)=>`<path d="m${-46+i*10} ${170-i*4} 194 189 213-84"/>`).join('')}</g>`,
  'ai-tools': id => `<g class="portal-sculpture">
   <path d="M-34 83C69-35 237-19 293 87s-75 153-72 240 137 95 94 166L88 521C0 371 165 320 92 237S-112 174-34 83Z" fill="url(#${id}-metal)"/>
   <path d="M21 94C112-13 247 11 251 92S126 222 168 331s116 92 97 156" fill="none" stroke="url(#${id}-edge)" stroke-width="2.5"/>
   <ellipse cx="130" cy="167" rx="62" ry="113" transform="rotate(-36 130 167)" fill="url(#${id}-dark)"/>
   <ellipse cx="130" cy="167" rx="62" ry="113" transform="rotate(-36 130 167)" fill="none" stroke="url(#${id}-edge)" stroke-width="2"/>
   <path d="M-30 122C11 279 200 165 315 289" fill="none" stroke="url(#${id}-metal)" stroke-width="43"/>
   <path d="M-30 103C11 260 200 146 315 270" fill="none" stroke="url(#${id}-edge)" stroke-width="1.5"/>
  </g><g class="portal-fine-lines" fill="none" stroke="#e8ff9d" stroke-opacity=".22">${Array.from({length:10},(_,i)=>`<path d="M${-30+i*9} 10C${250+i*5} 60 ${45+i*8} 238 ${307+i*6} 358"/>`).join('')}</g>`
 };
 const palettes = {
  strategy:['#080e2b','#1c0998','#7462ff','#8be7ff','#15124b'],
  execution:['#071c27','#0e686b','#b3ebc4','#dfff9a','#163638'],
  technology:['#100c29','#3930a6','#a69cff','#e7eaff','#22244e'],
  'ai-tools':['#0b1720','#526e27','#ccff00','#eaffbb','#122e31']
 };
 return kind => {
  if(!compositions[kind])return '';
  const id=`home-portal-${++serial}`;
  const [base,shade,mid,light,edge]=palettes[kind];
  return `<span class="capability-art" aria-hidden="true"><svg viewBox="0 0 300 500" preserveAspectRatio="xMidYMid slice" focusable="false" xmlns="http://www.w3.org/2000/svg"><defs>
   <linearGradient id="${id}-metal" x1="0" y1=".2" x2="1" y2=".7"><stop stop-color="${light}"/><stop offset=".13" stop-color="${mid}"/><stop offset=".3" stop-color="${shade}"/><stop offset=".43" stop-color="${edge}"/><stop offset=".52" stop-color="${light}"/><stop offset=".59" stop-color="${mid}"/><stop offset=".76" stop-color="${shade}"/><stop offset=".91" stop-color="${base}"/><stop offset="1" stop-color="${light}"/></linearGradient>
   <linearGradient id="${id}-dark" x2="1" y2="1"><stop stop-color="${base}"/><stop offset=".55" stop-color="${shade}"/><stop offset=".86" stop-color="${mid}"/><stop offset="1" stop-color="${light}"/></linearGradient>
   <linearGradient id="${id}-edge" x2=".9" y2="1"><stop stop-color="${light}" stop-opacity="0"/><stop offset=".28" stop-color="${light}"/><stop offset=".6" stop-color="#fff"/><stop offset="1" stop-color="${light}" stop-opacity="0"/></linearGradient>
   <radialGradient id="${id}-glow" cx=".2" cy=".15" r=".9"><stop stop-color="${shade}"/><stop offset="1" stop-color="${base}"/></radialGradient>
  </defs><path fill="url(#${id}-glow)" d="M0 0h300v500H0z"/>${compositions[kind](id)}<circle class="portal-orb" cx="248" cy="74" r="2.5" fill="#ccff00"/></svg><span class="portal-light"></span><span class="portal-grain"></span></span>`;
 };
})();

function renderHomeCapabilityArt(kind){return homePortalArt(kind);}
