// Paisajes del mapa de lecciones (unidades 1 a 10): un río que nace en un ibón y baja hasta el llano.
// Cada lección es una piedra del río. Generado con disenos/codigo/genrios.cjs a partir de los bocetos.
// (Los paisajes de montaña para las unidades 11 a 20 están en disenos/codigo/paisajes-cumbres.js.)
(function () {

const G=(x,y,s,inner)=>'<g transform="translate('+x.toFixed(1)+','+y.toFixed(1)+') scale('+s.toFixed(2)+')">'+inner+'</g>';
const D={
 tree:(c)=>'<rect x="-3" y="0" width="6" height="16" rx="2" fill="#7A5534"/><circle cx="0" cy="-8" r="14" fill="'+c+'"/><circle cx="-9" cy="-1" r="10" fill="'+c+'"/><circle cx="9" cy="-1" r="10" fill="'+c+'"/>',
 pine:()=>'<rect x="-3" y="8" width="6" height="10" fill="#6B4A2E"/><path d="M0 -26 L16 10 H-16Z" fill="#2F6B3A"/><path d="M0 -36 L12 -8 H-12Z" fill="#3A7D45"/>',
 snowpine:()=>'<rect x="-3" y="8" width="6" height="10" fill="#6B4A2E"/><path d="M0 -26 L16 10 H-16Z" fill="#2F5E4A"/><path d="M0 -36 L12 -8 H-12Z" fill="#386E57"/><path d="M0 -36 L6 -22 L2 -24 L-2 -20 L-6 -22Z" fill="#fff"/><path d="M-16 10 L-9 -4 L-5 2 L0 -4 L5 2 L9 -4 L16 10Z" fill="#fff" opacity=".9"/>',
 bare:()=>'<path d="M0 18 V-6 M0 -2 L-10 -14 M0 -6 L9 -18 M-5 -8 L-12 -6 M4 -12 L12 -10" stroke="#6B4A2E" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M-12 -15 q3 -3 6 0 M6 -20 q3 -3 6 0" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"/>',
 bush:(c)=>'<circle cx="-7" cy="0" r="8" fill="'+c+'"/><circle cx="6" cy="-1" r="9" fill="'+c+'"/><circle cx="0" cy="-6" r="8" fill="'+c+'"/>',
 rock:()=>'<ellipse cx="0" cy="0" rx="12" ry="7" fill="#A9A49A"/><ellipse cx="-3" cy="-2" rx="6" ry="3" fill="#C4C0B6"/>',
 snowrock:()=>'<ellipse cx="0" cy="0" rx="12" ry="7" fill="#9BA3AC"/><ellipse cx="0" cy="-4" rx="10" ry="3.5" fill="#fff"/>',
 flower:(c)=>'<circle r="3.4" fill="'+c+'"/><circle r="1.4" fill="#FFE27A"/>',
 tuft:(c)=>'<path d="M-6 0 q3 -10 6 0 q3 -12 6 0" stroke="'+(c||'#4E9A4A')+'" stroke-width="2" fill="none"/>',
 sunflower:()=>'<path d="M0 0 V24" stroke="#3E7D32" stroke-width="3"/><path d="M0 14 q-8 -2 -10 -8 q7 0 10 6" fill="#4E9A3A"/><g>'+[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>'<ellipse cx="0" cy="-9" rx="3.4" ry="6.5" fill="#F7C531" transform="rotate('+a+')"/>').join('')+'</g><circle r="6" fill="#6B3E1E"/>',
 wheat:()=>'<path d="M0 10 V-12" stroke="#C99A2E" stroke-width="1.6"/>'+[-10,-6,-2].map(y=>'<ellipse cx="-2.4" cy="'+y+'" rx="2" ry="3.4" fill="#E2B64A" transform="rotate(-25 -2.4 '+y+')"/><ellipse cx="2.4" cy="'+y+'" rx="2" ry="3.4" fill="#E2B64A" transform="rotate(25 2.4 '+y+')"/>').join(''),
 poppy:()=>'<circle r="3.6" fill="#D7261E"/><circle r="1.2" fill="#2A1A14"/>',
 corn:()=>'<path d="M0 22 V-22" stroke="#4F8F2F" stroke-width="3"/><path d="M0 6 q-12 -4 -14 -14 q10 2 14 10 M0 -4 q12 -4 14 -14 q-10 2 -14 10 M0 -14 q-9 -6 -9 -14 q7 4 9 10" fill="#5FA83A"/><ellipse cx="4" cy="0" rx="3" ry="7" fill="#F2CC4B"/><path d="M0 -22 l-3 -6 M0 -22 l3 -6" stroke="#C9A64A" stroke-width="1.5"/>',
 olive:()=>'<path d="M0 16 q-3 -8 2 -14" stroke="#6E5B45" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="-8" cy="-6" r="10" fill="#8A9A5B"/><circle cx="7" cy="-8" r="11" fill="#7E8F52"/><circle cx="0" cy="-15" r="9" fill="#94A465"/><circle cx="-4" cy="-8" r="1.6" fill="#3E4A2A"/><circle cx="5" cy="-12" r="1.6" fill="#3E4A2A"/>',
 cow:()=>'<g><rect x="-14" y="2" width="3" height="9" fill="#333"/><rect x="9" y="2" width="3" height="9" fill="#333"/><ellipse cx="0" cy="0" rx="16" ry="9" fill="#fff" stroke="#333" stroke-width="1"/><path d="M-6 -6 q5 2 3 8 q-6 1 -7 -4Z M6 -2 q4 -2 6 2 q-2 5 -6 3Z" fill="#333"/><ellipse cx="17" cy="-5" rx="6" ry="5" fill="#fff" stroke="#333" stroke-width="1"/><ellipse cx="21" cy="-3" rx="3" ry="2.4" fill="#F2B8B0"/><circle cx="16" cy="-7" r="1" fill="#333"/><path d="M14 -10 l-2 -3 M19 -10 l2 -3" stroke="#B89A6A" stroke-width="1.6"/></g>',
 sheep:()=>'<g><rect x="-8" y="3" width="2.4" height="7" fill="#333"/><rect x="5" y="3" width="2.4" height="7" fill="#333"/>'+[[-7,-2],[0,-5],[7,-2],[-3,2],[4,2]].map(p=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="6" fill="#F5F2EA"/>').join('')+'<ellipse cx="12" cy="-3" rx="4" ry="5" fill="#333"/><circle cx="13" cy="-4" r=".9" fill="#fff"/></g>',
 pig:()=>'<g><rect x="-9" y="4" width="3" height="6" fill="#E58C9A"/><rect x="5" y="4" width="3" height="6" fill="#E58C9A"/><ellipse cx="0" cy="0" rx="13" ry="8" fill="#F4A9B5"/><circle cx="12" cy="-2" r="6" fill="#F4A9B5"/><ellipse cx="17" cy="-1" rx="2.6" ry="2.2" fill="#E58C9A"/><circle cx="12" cy="-4" r="1" fill="#333"/><path d="M-13 -2 q-4 -3 -2 -6" stroke="#E58C9A" stroke-width="1.6" fill="none"/><path d="M9 -7 l2 -3 l2 3Z" fill="#E58C9A"/></g>',
 hen:(c)=>'<g><path d="M-1 6 v4 M2 6 v4" stroke="#E0A030" stroke-width="1.4"/><ellipse cx="0" cy="0" rx="7" ry="6" fill="'+(c||'#fff')+'"/><path d="M-6 -2 q-5 -6 -2 -9 q2 4 4 5Z" fill="'+(c||'#fff')+'"/><circle cx="6" cy="-5" r="3.6" fill="'+(c||'#fff')+'"/><path d="M5 -9 q1 -2 2 0 q1 -2 2 0" fill="#D7261E"/><path d="M9.4 -5 l3 1 l-3 1Z" fill="#E0A030"/><circle cx="6.5" cy="-5.5" r=".7" fill="#333"/></g>',
 borda:()=>'<rect x="-18" y="-10" width="36" height="22" fill="#CFC2A8"/><path d="M-22 -10 L0 -26 L22 -10Z" fill="#4F5A63"/><rect x="-5" y="0" width="10" height="12" fill="#6B4A2E"/><rect x="9" y="-5" width="6" height="5" fill="#5D6B75"/>',
 fence:()=>'<path d="M-20 0 h40 M-20 -6 h40" stroke="#9A7650" stroke-width="2"/><path d="M-18 4 v-14 M-6 4 v-14 M6 4 v-14 M18 4 v-14" stroke="#7A5534" stroke-width="2.4"/>',
 butterfly:(c)=>'<path d="M0 0 q-6 -7 -8 -2 q1 5 8 2 q6 -7 8 -2 q-1 5 -8 2" fill="'+c+'"/>',
 snowflake:()=>'<circle r="1.6" fill="#fff"/>',
};
function place(p,rx,spec){
  const r=p.getBoundingClientRect(),W=r.width,H=r.height;let seed=13+Math.round(H)+spec.seed;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};
  const pick=a=>a[Math.floor(rnd()*a.length)];
  let back='',front='';
  (spec.layers||[]).forEach(L=>{
    const items=[];
    const R=L.rect||[0,0,1,1],X0=R[0]*W,Y0=R[1]*H,X1=R[2]*W,Y1=R[3]*H;
    if(L.grid){for(let y=Y0+L.grid[1]*.7;y<Y1-6;y+=L.grid[1])for(let x=X0+L.grid[0]/2;x<X1-4;x+=L.grid[0])items.push([x+(rnd()-.5)*L.jit,y+(rnd()-.5)*L.jit]);}
    else{const n=Math.round((X1-X0)*(Y1-Y0)/1000*(L.per||1));for(let i=0;i<n;i++)items.push([X0+rnd()*(X1-X0),Y0+rnd()*(Y1-Y0)]);}
    items.sort((a,b)=>a[1]-b[1]).forEach(([x,y])=>{
      if(L.only&&rnd()>L.only)return;
      if(Math.abs(x-rx(y))<(L.gap||80))return; if(spec.lk){const dx=(x-spec.lk[0])/(spec.lk[2]+30),dy=(y-spec.lk[1])/(spec.lk[3]+26);if(dx*dx+dy*dy<1)return;} if(x<12||x>W-12)return; if(spec.source&&y<spec.source-10)return;
      const k=pick(L.kinds);const s=(L.size||1)*(0.85+rnd()*.35);
      const svg=G(x,y,s,D[k[0]](k[1]));if(L.front)front+=svg;else back+=svg;});
  });
  return back+front;
}
  const PAISAJES = [{"key":"ibon","title":"Ibón: nace el río","bg":"radial-gradient(circle at 20% 30%,rgba(255,255,255,.10) 0 2px,transparent 3px) 0 0/34px 34px,linear-gradient(#A9C98A,#93BA7E)","head":"#3D6A7D","accent":"#3D6A7D","o":{"lake":1,"source":150,"bank":"#B8B1A0","water":"#3E9CC0","shine":"#9FD7EA","layers":[{"per":0.3,"gap":70,"kinds":[["rock"],["flower","#C9B6E8"],["flower","#fff"]]},{"per":0.18,"gap":100,"front":1,"size":1.05,"kinds":[["pine"],["pine"],["rock"]]}]}},{"key":"bosque","title":"Bosque","bg":"radial-gradient(circle at 20% 30%,rgba(255,255,255,.10) 0 2px,transparent 3px) 0 0/34px 34px,linear-gradient(#8CC56E,#74B55C)","head":"#2E6B45","accent":"#2E6B45","o":{"bank":"#C9B98E","water":"#5FB2D8","shine":"#A9DAEE","layers":[{"per":0.35,"gap":70,"kinds":[["tuft"],["flower","#fff"]]},{"per":0.3,"gap":96,"front":1,"size":1.1,"kinds":[["tree","#3E8A3E"],["tree","#57A64F"],["pine"],["pine"]]}]}},{"key":"otono","title":"Río en otoño","bg":"radial-gradient(circle at 20% 30%,rgba(255,255,255,.10) 0 2px,transparent 3px) 0 0/34px 34px,linear-gradient(#E7C98A,#D9B26A)","head":"#8A4B2A","accent":"#8A4B2A","o":{"bank":"#C9A26B","water":"#6DB9DC","shine":"#A9DAEE","layers":[{"per":0.35,"gap":66,"kinds":[["flower","#C8402F"],["flower","#E39B3B"],["tuft","#B58A3A"]]},{"per":0.32,"gap":96,"front":1,"size":1.1,"kinds":[["tree","#E8B62C"],["tree","#F2C94C"],["tree","#C8402F"],["tree","#D9822B"],["tree","#B8502A"],["tree","#6FA84F"],["pine"]]}]}},{"key":"invierno","title":"Invierno con nieve","bg":"linear-gradient(#F4F8FB,#E3EDF4)","head":"#4A6A86","accent":"#4A6A86","o":{"bank":"#FFFFFF","water":"#5E9FC4","shine":"#D6ECF7","layers":[{"per":0.18,"gap":70,"kinds":[["snowrock"]]},{"per":0.22,"gap":96,"front":1,"size":1.1,"kinds":[["snowpine"],["snowpine"],["bare"]]}]}},{"key":"prado","title":"Río en el prado (primavera)","bg":"radial-gradient(circle at 20% 30%,rgba(255,255,255,.10) 0 2px,transparent 3px) 0 0/34px 34px,linear-gradient(#9FD07E,#86C267)","head":"#4E8A3E","accent":"#4E8A3E","o":{"bank":"#D9C9A0","water":"#6DB9DC","shine":"#A9DAEE","layers":[{"per":0.45,"gap":66,"kinds":[["flower","#fff"],["flower","#F7D04A"],["flower","#F29BB5"],["tuft"]]},{"per":0.18,"gap":96,"front":1,"size":1.1,"kinds":[["tree","#5FAE57"],["tree","#4C9A4B"],["pine"]]}]}},{"key":"vacas","title":"Prado con vacas y ovejas","bg":"radial-gradient(circle at 20% 30%,rgba(255,255,255,.10) 0 2px,transparent 3px) 0 0/34px 34px,linear-gradient(#A6D386,#90C673)","head":"#3B6E8F","accent":"#3B6E8F","o":{"bank":"#D9C9A0","water":"#6DB9DC","shine":"#A9DAEE","layers":[{"per":0.3,"gap":66,"kinds":[["flower","#fff"],["flower","#F7D04A"]]},{"per":0.2,"gap":96,"front":1,"size":0.95,"kinds":[["cow"],["cow"],["sheep"],["sheep"],["tree","#5FAE57"]]}]}},{"key":"granja","title":"Granja","bg":"radial-gradient(circle at 20% 30%,rgba(255,255,255,.10) 0 2px,transparent 3px) 0 0/34px 34px,linear-gradient(#B5D488,#A2C977)","head":"#9A4A2E","accent":"#9A4A2E","o":{"bank":"#D9C29A","water":"#6DB9DC","shine":"#A9DAEE","layers":[{"per":0.25,"gap":66,"kinds":[["flower","#F7D04A"],["flower","#fff"]]},{"per":0.05,"gap":115,"front":1,"size":1.1,"kinds":[["borda"]]},{"per":0.19,"gap":96,"front":1,"size":0.95,"kinds":[["pig"],["pig"],["hen","#fff"],["hen","#C97A3A"],["tree","#5FAE57"]]}]}},{"key":"huerta","title":"Huerta: girasol, trigo y maíz","bg":"#A9D08A","head":"#B9791B","accent":"#B9791B","o":{"bank":"#D7C38E","water":"#57AFD4","shine":"#B2DFF0","parcels":[[0,0,0.5,0.45,"#A4C255"],[0,0.45,0.5,1,"#E4C468"],[0.5,0,1,0.6,"#E4C468"],[0.5,0.6,1,1,"#B08C5E"]],"layers":[{"rect":[0,0,0.5,0.45],"grid":[44,40],"jit":4,"gap":78,"front":1,"size":0.85,"kinds":[["sunflower"]]},{"rect":[0,0.45,0.5,1],"grid":[22,22],"jit":4,"gap":72,"size":0.9,"kinds":[["wheat"]]},{"rect":[0.5,0,1,0.6],"grid":[22,22],"jit":4,"gap":72,"size":0.9,"kinds":[["wheat"]]},{"rect":[0.5,0,1,0.6],"per":0.12,"gap":74,"front":1,"kinds":[["poppy"]]},{"rect":[0.5,0.6,1,1],"grid":[40,36],"jit":3,"gap":78,"front":1,"size":0.85,"kinds":[["corn"]]}]}},{"key":"campina","title":"Campiña: olivar, trigo y girasol","bg":"#A9D08A","head":"#6E7A3E","accent":"#6E7A3E","o":{"bank":"#BFA272","water":"#4FA6C9","shine":"#ADDBEC","parcels":[[0,0,0.5,0.55,"#D5BB8E"],[0,0.55,0.5,1,"#A4C255"],[0.5,0,1,0.4,"#E4C468"],[0.5,0.4,1,1,"#D5BB8E"]],"layers":[{"rect":[0,0,0.5,0.55],"grid":[62,62],"jit":6,"gap":92,"front":1,"size":0.95,"kinds":[["olive"]]},{"rect":[0,0.55,0.5,1],"grid":[44,40],"jit":4,"gap":78,"front":1,"size":0.85,"kinds":[["sunflower"]]},{"rect":[0.5,0,1,0.4],"grid":[22,22],"jit":4,"gap":72,"size":0.9,"kinds":[["wheat"]]},{"rect":[0.5,0.4,1,1],"grid":[62,62],"jit":6,"gap":92,"front":1,"size":0.95,"kinds":[["olive"]]}]}},{"key":"verano","title":"Verano","bg":"radial-gradient(circle at 20% 30%,rgba(255,255,255,.10) 0 2px,transparent 3px) 0 0/34px 34px,linear-gradient(#B9D86A,#A8CE60)","head":"#E08A1E","accent":"#E08A1E","o":{"bank":"#F0DFA8","water":"#33B3D6","shine":"#B8ECF7","layers":[{"per":0.5,"gap":66,"kinds":[["flower","#F7D04A"],["flower","#F29BB5"],["flower","#fff"],["butterfly","#F28C28"]]},{"per":0.14,"gap":96,"front":1,"size":1.1,"kinds":[["tree","#5FAE57"],["tree","#7BBF4F"]]}]}}];

  function drawRiver(p, pi, O) {
    const old = p.querySelector('svg.river'); if (old) old.remove();

  p.querySelectorAll('.stop').forEach((s,i)=>{const off=Math.round(Math.sin(i*1.1+0.6)*55);s.style.transform='translateX('+off+'px)';});
  const r=p.getBoundingClientRect();const pts=[...p.querySelectorAll('.node')].map(n=>{const b=n.getBoundingClientRect();return [b.left-r.left+b.width/2,b.top-r.top+b.height/2]});
  let SRC=null;
  if(O.source){const lx=Math.min(Math.max(pts[0][0]-10,130),r.width-130),ly=O.source;SRC=[lx,ly];pts.unshift([lx,ly]);}
  else pts.unshift([pts[0][0]-30,-60]);
  pts.push([pts[pts.length-1][0]+30,r.height+60]);
  let d='M'+pts[0];for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],m=(a[1]+b[1])/2;d+=' C'+a[0]+','+m+' '+b[0]+','+m+' '+b[0]+','+b[1];}
  const rx=y=>{for(let i=1;i<pts.length;i++){if(y<=pts[i][1]){const a=pts[i-1],b=pts[i],t=(y-a[1])/(b[1]-a[1]||1);return a[0]+(b[0]-a[0])*(3*t*t-2*t*t*t)}}return pts[pts.length-1][0]};
  let lakeBank='',lakeWater='',lk=null;
  if(O.lake){const a=SRC?120:112,b=SRC?50:62,y=SRC?SRC[1]:(pts[3][1]+pts[4][1])/2,x=SRC?SRC[0]:Math.min(Math.max(rx(y),a+30),r.width-a-30);lk=[x,y,a,b];
    const blob=(k)=>{let d='';for(let t=0;t<=72;t++){const ang=t/72*Math.PI*2,w=1+.08*Math.sin(ang*3+1)+.05*Math.cos(ang*5);const px=x+Math.cos(ang)*(a+k)*w,py=y+Math.sin(ang)*(b+k*.8)*w;d+=(t?' L':'M')+px.toFixed(1)+','+py.toFixed(1);}return d+'Z'};
    lakeBank='<path d="'+blob(14)+'" fill="'+O.bank+'" stroke="'+O.bank+'" stroke-width="10" stroke-linejoin="round"/>';
    lakeWater='<path d="'+blob(0)+'" fill="'+O.water+'" stroke="'+O.water+'" stroke-width="8" stroke-linejoin="round"/><ellipse cx="'+(x-40)+'" cy="'+(y-18)+'" rx="46" ry="9" fill="#fff" opacity=".22"/>';}
  let river='<path d="'+d+'" fill="none" stroke="'+O.bank+'" stroke-width="118" stroke-linecap="round"/>'+lakeBank+'<path d="'+d+'" fill="none" stroke="'+O.water+'" stroke-width="92" stroke-linecap="round"/>'
   +'<path d="'+d+'" fill="none" stroke="'+O.shine+'" stroke-width="40" stroke-linecap="round" stroke-dasharray="2 26" opacity=".9"/>'+lakeWater;
  const lakeRx=rx;
  const ground=(O.parcels||[]).map(q=>'<rect x="'+q[0]*r.width+'" y="'+q[1]*r.height+'" width="'+(q[2]-q[0])*r.width+'" height="'+(q[3]-q[1])*r.height+'" fill="'+q[4]+'" stroke="#9C8A5E" stroke-width="3" stroke-opacity=".35"/>').join('');
  let peaks='';
  if(O.source){const W=r.width,b=O.source-20;peaks='<defs><linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6FBDEB"/><stop offset="1" stop-color="#C9E8F8"/></linearGradient></defs>'
    +'<rect x="0" y="0" width="'+W+'" height="'+(b+10)+'" fill="url(#cielo)"/>'
    +'<circle cx="'+W*.86+'" cy="38" r="34" fill="#FFE27A" opacity=".35"/><circle cx="'+W*.86+'" cy="38" r="22" fill="#FFD23F"/>'
    +'<g fill="#fff" opacity=".95"><circle cx="'+W*.16+'" cy="34" r="11"/><circle cx="'+(W*.16+13)+'" cy="29" r="14"/><circle cx="'+(W*.16+28)+'" cy="34" r="10"/><rect x="'+W*.16+'" y="34" width="28" height="10"/></g>'
    +'<path d="M0 '+(b-10)+' L'+W*.12+' '+(b-70)+' L'+W*.24+' '+(b-40)+' L'+W*.42+' '+(b-120)+' L'+W*.58+' '+(b-60)+' L'+W*.74+' '+(b-135)+' L'+W*.9+' '+(b-70)+' L'+W+' '+(b-90)+' V'+(b+40)+' H0Z" fill="#9DB4C8"/>'
    +'<path d="M'+W*.36+' '+(b-98)+' L'+W*.42+' '+(b-120)+' L'+W*.48+' '+(b-98)+' L'+W*.44+' '+(b-102)+' L'+W*.42+' '+(b-94)+' L'+W*.39+' '+(b-102)+'Z M'+W*.67+' '+(b-110)+' L'+W*.74+' '+(b-135)+' L'+W*.81+' '+(b-108)+' L'+W*.77+' '+(b-112)+' L'+W*.74+' '+(b-104)+' L'+W*.71+' '+(b-112)+'Z" fill="#fff"/>'
    +'<path d="M0 '+(b+10)+' C'+W*.2+' '+(b-20)+' '+W*.4+' '+(b+5)+' '+W*.6+' '+(b-15)+' S'+W*.9+' '+(b-5)+' '+W+' '+(b-25)+' V'+(b+40)+' H0Z" fill="#7FAF78"/>';}
  p.insertAdjacentHTML('afterbegin','<svg class="river" viewBox="0 0 '+r.width+' '+r.height+'" preserveAspectRatio="none">'+peaks+ground+river+place(p,lakeRx,{...O,seed:pi*7,lk})+'</svg>');

  }

  // Coloca las piedras en zigzag suave, dibuja el río por ellas y el paisaje alrededor
  function layout(root) {
    root.querySelectorAll('.scape[data-scape]').forEach(p => {
      const i = +p.dataset.scape, P = PAISAJES[i]; if (!P) return;
      const O = P.o;
      drawRiver(p, i, O);
      const m = p.querySelector('.mascot-on-path');
      if (m) { const st = m.closest('.stop'); const off = parseFloat((st.style.transform.match(/-?[\d.]+/) || [0])[0]); m.style.left = off > 0 ? 'auto' : 'calc(100% + 4px)'; m.style.right = off > 0 ? 'calc(100% + 4px)' : 'auto'; }
    });
  }
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => layout(document), 200); });

  window.PAISAJES = PAISAJES;
  window.paisajeSVG = () => '';
  window.layoutPaisajes = layout;
})();
