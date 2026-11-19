// Page data. All art is inline SVG. Coordinates: page viewBox 300x430, window pieces use their own w x h.
const INK='#2b2a36', PENCIL='#55546a';
const defs=`<defs>
<pattern id="hatch" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><line x1="0" y1="0" x2="0" y2="3.2" stroke="${INK}" stroke-width=".55" opacity=".55"/></pattern>
<pattern id="hatch2" width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(-50)"><line x1="0" y1="0" x2="0" y2="2.4" stroke="${INK}" stroke-width=".5" opacity=".6"/></pattern>
<pattern id="stip" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1.2" cy="1.5" r=".55" fill="${INK}" opacity=".5"/><circle cx="3.7" cy="3.6" r=".5" fill="${INK}" opacity=".4"/></pattern>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="8"/><feColorMatrix values="0 0 0 0 .25  0 0 0 0 .25  0 0 0 0 .3  0 0 0 .55 -.18"/><feComposite in2="SourceGraphic" operator="in"/></filter>
<radialGradient id="gLiver" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#c4745f"/><stop offset=".6" stop-color="#8f4638"/><stop offset="1" stop-color="#5a2a24"/></radialGradient>
<radialGradient id="gLung" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#f1c9c4"/><stop offset=".7" stop-color="#d79d9a"/><stop offset="1" stop-color="#a86a6c"/></radialGradient>
<radialGradient id="gStom" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#f0b9a8"/><stop offset=".7" stop-color="#d98b7b"/><stop offset="1" stop-color="#a95a52"/></radialGradient>
<radialGradient id="gBone" cx=".35" cy=".25" r="1"><stop offset="0" stop-color="#fffdf5"/><stop offset=".7" stop-color="#ece4cf"/><stop offset="1" stop-color="#c9bd9f"/></radialGradient>
<linearGradient id="gRed" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9534f"/><stop offset="1" stop-color="#7d1f26"/></linearGradient>
<linearGradient id="gBlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6b8fd0"/><stop offset="1" stop-color="#27407f"/></linearGradient>
<linearGradient id="gEnamel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fdfdfb"/><stop offset="1" stop-color="#cfd9e4"/></linearGradient>
<linearGradient id="gDentin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4dfa4"/><stop offset="1" stop-color="#d1a95a"/></linearGradient>
<linearGradient id="gSkin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff8f0"/><stop offset="1" stop-color="#ecd9c6"/></linearGradient>
</defs>`;
const hw=(x,y,t,s=13,o='')=>`<text x="${x}" y="${y}" class="ink" font-size="${s}" ${o}>${t}</text>`;
const hl=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#f0586d" opacity=".5" style="mix-blend-mode:multiply" filter="url(#rough)"/>`;
const leader=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1} Q${(x1+x2)/2} ${y1+6} ${x2} ${y2}" fill="none" stroke="${PENCIL}" stroke-width=".7"/><circle cx="${x2}" cy="${y2}" r="1.2" fill="${PENCIL}"/>`;
const title=(t)=>`<g filter="url(#rough)">${hw(14,98,t,19,'font-weight="700"')}<path d="M14 103 C70 107 150 99 232 104" stroke="#e0334a" stroke-width="1.6" fill="none"/></g>`;
const staples=`<g opacity=".5"><path d="M0 0H300V0" /></g>`;
const doodle=(x,y)=>`<g fill="none" stroke="${PENCIL}" stroke-width=".7" filter="url(#rough)"><path d="M${x} ${y} q8 -10 16 0 t16 0 t16 0"/><path d="M${x+2} ${y+8} q8 -9 15 0 t15 0"/></g>`;

// ---- PAGE 1: tooth ----
const toothP='M50 20 C70 8 120 8 140 20 C152 30 150 60 140 85 C134 105 135 150 122 160 C112 165 105 150 98 125 C92 150 84 165 74 160 C60 150 62 105 52 85 C40 60 38 30 50 20Z';
const tooth={
 win:{x:90,y:108,w:190,h:180},
 under:`<g filter="url(#rough)">
  <path d="M0 96 H190 V180 H0Z" fill="#e8dcc4"/><path d="M0 96 H190" stroke="${INK}" stroke-width="1.2"/>
  <rect x="0" y="96" width="190" height="84" fill="url(#stip)" opacity=".7"/>
  <path d="M0 102 C40 96 60 104 190 98" fill="none" stroke="#c46a74" stroke-width="5" opacity=".6"/>
  <path d="${toothP}" fill="url(#gEnamel)" stroke="${INK}" stroke-width="1.6"/>
  <g transform="translate(95 90) scale(.84) translate(-95 -90)"><path d="${toothP}" fill="url(#gDentin)" stroke="${INK}" stroke-width="1"/><path d="${toothP}" fill="url(#hatch)" opacity=".35"/></g>
  <path d="M82 40 C90 30 108 30 114 40 C120 60 112 80 108 96 C108 120 106 140 102 148 C99 130 98 110 98 100 C96 120 94 138 90 146 C86 130 86 106 88 94 C84 76 78 56 82 40Z" fill="#e67e87" stroke="${INK}" stroke-width="1"/>
  <path d="M60 130 C64 148 70 156 76 156 M134 130 C130 148 124 156 120 156" stroke="#d9c26b" stroke-width="3" fill="none"/>
  <path d="${toothP}" fill="url(#hatch2)" opacity=".18"/>
  <path d="M60 24 C75 14 100 12 120 16" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>
 </g>`,
 flap:`<g filter="url(#rough)">
  <path d="${toothP}" fill="#fff" stroke="#fff" stroke-width="9" stroke-linejoin="round"/>
  <path d="${toothP}" fill="url(#gBone)" stroke="${INK}" stroke-width="1.6"/>
  <path d="M52 28 C62 40 70 38 80 28 M82 30 C94 42 104 40 112 28 M114 30 C124 40 132 40 140 28" fill="none" stroke="${INK}" stroke-width="1.1"/>
  <path d="${toothP}" fill="url(#hatch)" opacity=".28"/>
  <path d="M66 70 C75 90 74 120 80 148 M120 68 C112 92 118 126 114 148" fill="none" stroke="${PENCIL}" stroke-width=".8" opacity=".7"/>
  <path d="M52 24 C70 12 118 12 138 24" fill="none" stroke="#fff" stroke-width="3" opacity=".9"/>
  <path d="M44 88 C70 96 120 96 148 86" fill="none" stroke="#e5868f" stroke-width="3" opacity=".7"/>
 </g>`,
 notes:()=>title('Teeth · Dentes')+
  `<g filter="url(#rough)">`+
  hw(10,125,'Enamel')+leader(52,129,128,136)+
  hw(10,168,'Dentin')+leader(48,172,152,158)+
  hw(10,208,'Pulp')+hw(10,221,'cavity',12)+leader(44,212,186,168)+
  hw(10,252,'Cementum')+leader(70,256,156,244)+
  hw(10,300,'Bone')+
  hw(14,318,'Adult: 32 teeth,  2 · 1 · 2 · 3  × 4')+hl(66,306,134,16)+
  hw(14,340,'Enamel: 96 % mineral, hardest tissue')+
  hw(14,360,'Dentin: ~70 % mineral, has tubules')+
  hw(14,380,'Pulp: nerves + blood vessels')+
  hw(14,400,'Root canal = cleaning the pulp space')+hl(60,388,150,16)+
  `</g>`+doodle(200,330)
};

// ---- PAGE 2: thorax ----
const rib=(s,i)=>{const sy=34+i*7.6,wi=34+46*Math.sin(Math.PI*(i+.9)/12.6);
 const x0=100+s*6,x1=100+s*wi*.92,x2=100+s*(wi+4);
 return `M${x0} ${sy} C${100+s*wi*.45} ${sy-6} ${x1} ${sy-2} ${x2} ${sy+16+i*1.3}`};
let ribsSil='',ribsInk='';
for(let i=0;i<10;i++)for(const s of[-1,1]){const d=rib(s,i);ribsSil+=`<path d="${d}" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>`;
 ribsInk+=`<path d="${d}" stroke="${INK}" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#fffdf5" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${INK}" stroke-width=".5" fill="none" transform="translate(0 1.2)" opacity=".7"/>`}
const thorax={
 win:{x:50,y:108,w:200,h:180},
 under:`<g filter="url(#rough)">
  <path d="M97 8 h6 v42 h-6z" fill="#e9e1d0" stroke="${INK}" stroke-width="1"/>
  <path d="M100 48 C88 56 72 58 62 66 M100 48 C112 56 128 58 138 66" stroke="${INK}" stroke-width="2" fill="none"/>
  <path d="M96 36 C70 34 44 64 40 108 C38 136 50 150 70 150 C90 151 97 138 97 122Z" fill="url(#gLung)" stroke="${INK}" stroke-width="1.5"/>
  <path d="M104 36 C130 34 158 66 160 108 C162 134 150 150 130 150 C112 151 106 140 106 128 C106 118 104 112 104 100Z" fill="url(#gLung)" stroke="${INK}" stroke-width="1.5"/>
  <path d="M48 96 C66 98 86 92 96 84 M46 120 C64 118 84 112 96 104" stroke="${INK}" stroke-width=".9" fill="none"/>
  <path d="M104 84 C122 90 142 92 158 88" stroke="${INK}" stroke-width=".9" fill="none"/>
  <path d="M42 100 C50 120 52 140 70 150 L97 150 L97 110Z" fill="url(#hatch)" opacity=".28"/>
  <path d="M100 96 C90 112 96 142 114 152 C134 140 136 112 122 98 C114 90 104 88 100 96Z" fill="url(#gRed)" stroke="${INK}" stroke-width="1.4"/>
  <path d="M104 100 C108 96 114 98 116 102" stroke="#fff" opacity=".6" stroke-width="2" fill="none"/>
  <path d="M20 160 C60 146 140 146 180 160" stroke="${INK}" stroke-width="1.4" fill="none"/>
  <path d="M0 160 C60 146 140 146 200 162 V180 H0Z" fill="#dcb0a2" opacity=".7"/>
  <path d="M0 160 C60 146 140 146 200 162 V180 H0Z" fill="url(#hatch2)" opacity=".4"/>
  <path d="M60 80 C70 76 80 78 84 84 M120 78 C132 76 142 80 146 88" stroke="#fff" stroke-width="2.4" opacity=".6" fill="none"/>
 </g>`,
 flap:`<g filter="url(#rough)">
  <g>${ribsSil}</g><path d="M92 20 h16 v100 q-8 14 -16 0z" fill="#fff" stroke="#fff" stroke-width="9" stroke-linejoin="round"/>
  <path d="M40 22 L92 28 M160 22 L108 28" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
  ${ribsInk}
  <path d="M40 22 C60 24 78 26 92 28 M160 22 C140 24 122 26 108 28" stroke="${INK}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <path d="M40 22 C60 24 78 26 92 28 M160 22 C140 24 122 26 108 28" stroke="#fffdf5" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path d="M91 22 h18 l-2 28 h-14z" fill="url(#gBone)" stroke="${INK}" stroke-width="1.4"/>
  <path d="M93 52 h14 l-1 62 q-6 10 -12 0z" fill="url(#gBone)" stroke="${INK}" stroke-width="1.4"/>
  <path d="M96 114 l4 12 l4 -12" fill="url(#gBone)" stroke="${INK}" stroke-width="1.2"/>
  <path d="M95 50 h10" stroke="${INK}" stroke-width="1.2"/>
 </g>`,
 notes:()=>title('Thorax · Cavitas thoracis')+`<g filter="url(#rough)">`+
  hw(14,312,'Ribs: 7 true · 3 false · 2 floating')+hl(10,300,196,16)+
  hw(14,332,'Sternum = manubrium / body / xiphoid')+
  hw(14,352,'Right lung 3 lobes, left lung 2')+hw(14,366,'(cardiac notch on the left)',12)+
  hw(14,388,'Diaphragm: main muscle of breathing')+hl(10,376,200,16)+
  hw(14,408,'Trachea  →  bronchi  →  alveoli')+`</g>`+doodle(205,332)
};

// ---- PAGE 3: abdomen ----
let gut='';{const rows=6;for(let r=0;r<rows;r++){const y=100+r*9,dir=r%2?1:-1;gut+=`M${dir>0?62:148} ${y} `;gut+=`C ${dir>0?80:130} ${y-10}, ${dir>0?100:110} ${y+10}, ${dir>0?148:62} ${y} S ${dir>0?150:60} ${y+8}, ${dir>0?148:62} ${y+9} `}}
const abdomen={
 win:{x:45,y:108,w:210,h:180},
 under:`<g filter="url(#rough)">
  <path d="M42 120 V172 H168 V120" fill="none" stroke="#f2e0b6" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M42 120 V172 H168 V120" fill="none" stroke="${INK}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-5 0)"/>
  <path d="M42 120 V172 H168 V120" fill="none" stroke="${INK}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 0)"/>
  <path d="M42 120 C56 104 154 104 168 120" fill="none" stroke="#f2e0b6" stroke-width="11" stroke-linecap="round"/>
  <path d="M${gut}" fill="none" stroke="#e8a69a" stroke-width="6.5" stroke-linecap="round"/>
  <path d="M${gut}" fill="none" stroke="${INK}" stroke-width=".7" stroke-linecap="round" opacity=".7"/>
  <path d="M120 40 C152 34 180 52 174 88 C168 114 142 118 134 100 C142 90 142 74 128 70 Z" fill="url(#gStom)" stroke="${INK}" stroke-width="1.5"/>
  <path d="M132 50 C150 46 166 56 166 74" stroke="#fff" stroke-width="2.4" opacity=".6" fill="none"/>
  <path d="M14 56 C46 34 112 40 128 66 C118 84 96 94 66 98 C34 103 12 88 14 56Z" fill="url(#gLiver)" stroke="${INK}" stroke-width="1.6"/>
  <path d="M70 46 C76 62 74 80 66 98" stroke="${INK}" stroke-width="1" fill="none"/>
  <path d="M14 56 C46 34 112 40 128 66 C118 84 96 94 66 98 C34 103 12 88 14 56Z" fill="url(#hatch)" opacity=".22"/>
  <path d="M30 52 C50 44 80 44 100 52" stroke="#fff" stroke-width="2.6" opacity=".45" fill="none"/>
  <path d="M86 94 C92 100 98 106 94 114 C88 114 82 106 86 94Z" fill="#6f9a4b" stroke="${INK}" stroke-width="1"/>
 </g>`,
 flap:`<g filter="url(#rough)">
  <path d="M8 10 C60 -2 150 -2 202 10 C214 70 212 130 196 176 C150 186 60 186 14 176 C-2 130 -4 70 8 10Z" fill="#fff" stroke="#fff" stroke-width="8" stroke-linejoin="round"/>
  <path d="M8 10 C60 -2 150 -2 202 10 C214 70 212 130 196 176 C150 186 60 186 14 176 C-2 130 -4 70 8 10Z" fill="url(#gSkin)" stroke="${INK}" stroke-width="1.5"/>
  <path d="M105 6 V182" stroke="${INK}" stroke-width="1.4"/>
  <g fill="#f1b6a6" stroke="${INK}" stroke-width="1.1">
   ${[0,1,2].map(i=>[-1,1].map(s=>`<path d="M${105+s*4} ${24+i*44} q${s*34} -4 ${s*52} ${6} v36 q${-s*34} 4 ${-s*52} -2z"/>`).join('')).join('')}
  </g>
  <path d="M40 30 C60 70 56 130 40 160 M170 30 C150 70 154 130 170 160" stroke="${PENCIL}" stroke-width=".9" fill="none"/>
  <path d="M10 14 C60 2 150 2 200 14" stroke="#fff" stroke-width="3" opacity=".8" fill="none"/>
  <circle cx="105" cy="110" r="3" fill="none" stroke="${INK}" stroke-width="1.2"/>
  <path d="M0 0" /></g>`,
 notes:()=>title('Abdomen · Hepar')+`<g filter="url(#rough)">`+
  hw(14,312,'Lobus hepatis dexter')+hw(14,330,'Lobus hepatis sinister')+hl(10,318,160,16)+
  hw(14,350,'Lig. falciforme · Lig. coronarium')+
  hw(14,370,'Vesica fellea (gall bladder)')+
  hw(14,390,'Colon: ascending, transverse, descending')+hl(70,378,60,16)+
  hw(14,410,'Small intestine ≈ 6 m long')+`</g>`+doodle(200,350)
};

// ---- PAGE 4: heart ----
const heartP='M100 160 C40 120 38 70 70 56 C88 48 98 58 100 66 C104 56 122 46 140 58 C172 76 160 122 100 160Z';
const heart={
 win:{x:50,y:108,w:200,h:180},
 under:`<g filter="url(#rough)"><defs><clipPath id="hc"><path d="${heartP}"/></clipPath></defs>
  <path d="M82 58 V4" stroke="url(#gBlue)" stroke-width="9" stroke-linecap="round"/>
  <path d="M112 62 C112 14 150 8 150 44" stroke="url(#gRed)" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M92 62 C88 40 70 30 56 42" stroke="url(#gBlue)" stroke-width="8" fill="none" stroke-linecap="round"/>
  <g clip-path="url(#hc)"><rect x="30" y="40" width="70" height="60" fill="#7e9bd6"/><rect x="30" y="98" width="72" height="80" fill="url(#gBlue)"/>
   <rect x="100" y="40" width="80" height="60" fill="#e68a86"/><rect x="100" y="98" width="80" height="80" fill="url(#gRed)"/>
   <path d="M100 56 V166" stroke="${INK}" stroke-width="3"/><path d="M30 99 C60 94 90 104 100 100 C120 96 150 104 176 98" stroke="${INK}" stroke-width="2.4" fill="none"/>
   <path d="${heartP}" fill="url(#hatch)" opacity=".25"/>
   <path d="M60 80 C70 66 84 68 90 76" stroke="#fff" stroke-width="2.4" opacity=".5" fill="none"/></g>
  <path d="${heartP}" fill="none" stroke="${INK}" stroke-width="1.8"/>
  <g font-size="12" class="ink" fill="${INK}"><text x="62" y="82">RA</text><text x="62" y="132">RV</text><text x="124" y="82">LA</text><text x="126" y="132" fill="#fff">LV</text></g>
  <path d="M70 104 l8 4 M128 104 l8 4" stroke="${INK}" stroke-width="1.4"/>
 </g>`,
 flap:`<g filter="url(#rough)">
  <path d="${heartP}" fill="#fff" stroke="#fff" stroke-width="9" stroke-linejoin="round"/>
  <path d="${heartP}" fill="#f4d7cd" stroke="${INK}" stroke-width="1.6"/>
  <path d="${heartP}" fill="#f7e9c0" opacity=".55" transform="translate(0 -4) scale(.96) translate(4 8)"/>
  <path d="${heartP}" fill="url(#stip)" opacity=".5"/><path d="${heartP}" fill="url(#hatch2)" opacity=".2"/>
  <path d="M100 64 C96 90 98 120 100 150 M100 64 C124 70 142 96 134 122 M100 90 C80 92 62 100 60 112" stroke="#b82334" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <path d="M100 64 C96 90 98 120 100 150 M100 64 C124 70 142 96 134 122 M100 90 C80 92 62 100 60 112" stroke="#f2858f" stroke-width="1" fill="none"/>
  <path d="M110 70 C108 90 102 100 100 110 M72 70 C74 82 70 96 64 104" stroke="#3a58a0" stroke-width="2.4" fill="none"/>
  <path d="M60 64 C72 54 86 56 92 66" stroke="#fff" stroke-width="3" opacity=".7" fill="none"/>
 </g>`,
 notes:()=>title('Heart · Cor')+`<g filter="url(#rough)">`+
  hw(14,312,'Flow:  RA → RV → lungs → LA → LV → aorta')+hl(30,300,170,16)+
  hw(14,334,'Valves: tricuspid · pulmonary')+hw(14,350,'mitral · aortic',13)+
  hw(14,374,'Right side: deoxygenated (blue)')+hw(14,394,'Left side: oxygenated (red)')+
  hw(14,414,'Coronary arteries feed the heart itself')+`</g>`+doodle(205,336)
};

const END={win:null,notes:()=>`<g filter="url(#rough)">${hw(40,160,'Fin.',34,'font-weight="700"')}${hw(40,205,'Tap a cutout to lift it,',17)}${hw(40,228,'flip to see what is under.',17)}${hw(40,290,'(flip back to start)',14)}</g>`+doodle(40,330)};
const PAGES=[tooth,thorax,abdomen,heart,END];
