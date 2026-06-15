// ── Rack Capture & Cable Tracing Engine ──
const CABLE_COLORS=[
  {name:'Blue',    hex:'#00B7D9',label:'Data – Primary'},
  {name:'Red',     hex:'#FF4444',label:'Data – Secondary'},
  {name:'Green',   hex:'#00DC64',label:'Uplink'},
  {name:'Yellow',  hex:'#FBB843',label:'Management'},
  {name:'Orange',  hex:'#FF8C00',label:'Cross-connect'},
  {name:'White',   hex:'#FFFFFF',label:'Fiber'},
  {name:'Purple',  hex:'#A78BFA',label:'Out-of-band'},
  {name:'Gray',    hex:'#8899AA',label:'Patch / spare'},
];

let rackState={
  img:null,imgEl:null,
  mode:'trace',
  cables:[],
  currentCable:null,
  drawing:false,
  selectedColor:CABLE_COLORS[0],
  labels:[],
  history:[],
};

window.initRack=function(){
  buildColorPicker();
};

function buildColorPicker(){
  const cp=document.getElementById('color-picker');
  if(!cp)return;
  cp.innerHTML=CABLE_COLORS.map((c,i)=>`
    <div class="legend-item" style="cursor:pointer" onclick="selectColor(${i})" id="cp-${i}">
      <div class="legend-dot" style="background:${c.hex};width:16px;height:16px;border:2px solid ${i===0?'white':'transparent'};border-radius:50%;transition:border 0.2s"></div>
      <span style="font-size:11px;color:var(--text2)">${c.name}</span>
    </div>`).join('');
}

window.selectColor=function(i){
  rackState.selectedColor=CABLE_COLORS[i];
  document.querySelectorAll('[id^="cp-"] .legend-dot').forEach((d,j)=>{
    d.style.border=j===i?'2px solid white':'2px solid transparent';
  });
};

window.loadRackImage=function(input){
  const file=input.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    rackState.img=e.target.result;
    rackState.cables=[];rackState.labels=[];rackState.history=[];
    document.getElementById('rack-upload-zone').style.display='none';
    document.getElementById('rack-editor').style.display='block';
    const img=document.getElementById('rack-img');
    img.src=e.target.result;
    img.onload=()=>{
      setupCanvas();
      renderCables();
      updateCableList();
    };
    buildColorPicker();
    setMode('trace');
  };
  reader.readAsDataURL(file);
};

function setupCanvas(){
  const img=document.getElementById('rack-img');
  const canvas=document.getElementById('rack-canvas');
  canvas.width=img.offsetWidth;
  canvas.height=img.offsetHeight;
  canvas.style.width=img.offsetWidth+'px';
  canvas.style.height=img.offsetHeight+'px';
  canvas.removeEventListener('mousedown',onDown);
  canvas.removeEventListener('mousemove',onMove);
  canvas.removeEventListener('mouseup',onUp);
  canvas.removeEventListener('touchstart',onTouchStart);
  canvas.removeEventListener('touchmove',onTouchMove);
  canvas.removeEventListener('touchend',onTouchEnd);
  canvas.addEventListener('mousedown',onDown);
  canvas.addEventListener('mousemove',onMove);
  canvas.addEventListener('mouseup',onUp);
  canvas.addEventListener('touchstart',onTouchStart,{passive:false});
  canvas.addEventListener('touchmove',onTouchMove,{passive:false});
  canvas.addEventListener('touchend',onTouchEnd);
  rackState.imgEl=img;
}

function getPos(e,canvas){
  const r=canvas.getBoundingClientRect();
  const sx=canvas.width/r.width,sy=canvas.height/r.height;
  return{x:(e.clientX-r.left)*sx,y:(e.clientY-r.top)*sy};
}

function onDown(e){
  e.preventDefault();
  const canvas=document.getElementById('rack-canvas');
  const pos=getPos(e,canvas);
  if(rackState.mode==='trace'){
    rackState.drawing=true;
    const label=document.getElementById('cable-label-input').value||rackState.selectedColor.label;
    rackState.currentCable={
      id:Date.now(),
      color:rackState.selectedColor.hex,
      colorName:rackState.selectedColor.name,
      label:label,
      points:[pos],
    };
  } else if(rackState.mode==='label'){
    const text=prompt('Enter label text:');
    if(text){
      rackState.labels.push({x:pos.x,y:pos.y,text});
      rackState.history.push({type:'label',idx:rackState.labels.length-1});
      renderCables();
    }
  }
}

function onMove(e){
  if(!rackState.drawing||rackState.mode!=='trace')return;
  e.preventDefault();
  const canvas=document.getElementById('rack-canvas');
  const pos=getPos(e,canvas);
  rackState.currentCable.points.push(pos);
  renderCables(true);
}

function onUp(e){
  if(!rackState.drawing)return;
  rackState.drawing=false;
  if(rackState.currentCable&&rackState.currentCable.points.length>2){
    rackState.cables.push(rackState.currentCable);
    rackState.history.push({type:'cable',idx:rackState.cables.length-1});
    updateCableList();
  }
  rackState.currentCable=null;
  renderCables();
}

function onTouchStart(e){e.preventDefault();onDown(e.touches[0])}
function onTouchMove(e){e.preventDefault();onMove(e.touches[0])}
function onTouchEnd(e){onUp(e)}

function renderCables(preview=false){
  const canvas=document.getElementById('rack-canvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Draw all saved cables
  rackState.cables.forEach(cable=>{
    if(cable.points.length<2)return;
    ctx.save();
    ctx.strokeStyle=cable.color;
    ctx.lineWidth=4;ctx.lineCap='round';ctx.lineJoin='round';
    ctx.shadowColor=cable.color;ctx.shadowBlur=8;
    ctx.globalAlpha=0.85;
    ctx.beginPath();ctx.moveTo(cable.points[0].x,cable.points[0].y);
    cable.points.forEach(p=>ctx.lineTo(p.x,p.y));
    ctx.stroke();
    // Endpoint dots
    ctx.globalAlpha=1;ctx.shadowBlur=12;
    [cable.points[0],cable.points[cable.points.length-1]].forEach(p=>{
      ctx.beginPath();ctx.arc(p.x,p.y,6,0,Math.PI*2);
      ctx.fillStyle=cable.color;ctx.fill();
      ctx.strokeStyle='white';ctx.lineWidth=2;ctx.shadowBlur=0;ctx.stroke();
    });
    // Mid-point label
    const mid=cable.points[Math.floor(cable.points.length/2)];
    ctx.shadowBlur=0;ctx.globalAlpha=1;
    ctx.fillStyle='rgba(0,8,20,0.75)';
    const tw=ctx.measureText(cable.label).width;
    ctx.fillRect(mid.x-tw/2-6,mid.y-14,tw+12,20);
    ctx.fillStyle=cable.color;ctx.font='bold 11px -apple-system,sans-serif';
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(cable.label,mid.x,mid.y-4);
    ctx.restore();
  });

  // Draw labels
  rackState.labels.forEach(lbl=>{
    ctx.save();
    ctx.fillStyle='rgba(0,8,20,0.8)';
    const tw=ctx.measureText(lbl.text).width;
    ctx.fillRect(lbl.x-6,lbl.y-16,tw+14,22);
    ctx.fillStyle='#ffffff';ctx.font='bold 12px -apple-system,sans-serif';
    ctx.textAlign='left';ctx.textBaseline='middle';
    ctx.fillText(lbl.text,lbl.x+1,lbl.y-5);
    ctx.restore();
  });

  // Preview current drawing cable
  if(preview&&rackState.currentCable&&rackState.currentCable.points.length>1){
    const c=rackState.currentCable;
    ctx.save();ctx.strokeStyle=c.color;ctx.lineWidth=4;ctx.lineCap='round';ctx.lineJoin='round';
    ctx.globalAlpha=0.6;ctx.shadowColor=c.color;ctx.shadowBlur=10;
    ctx.beginPath();ctx.moveTo(c.points[0].x,c.points[0].y);
    c.points.forEach(p=>ctx.lineTo(p.x,p.y));
    ctx.stroke();ctx.restore();
  }
}

function updateCableList(){
  const el=document.getElementById('cable-list-items');if(!el)return;
  if(!rackState.cables.length){el.innerHTML='<p style="color:var(--text3);font-size:12px;text-align:center;padding:16px">Trace cables on the rack image above to document them here.</p>';return}
  el.innerHTML=rackState.cables.map((c,i)=>`
    <div class="cable-entry">
      <div class="cable-color-dot" style="background:${c.color};box-shadow:0 0 6px ${c.color}"></div>
      <div class="cable-info"><strong>${c.label}</strong> <span style="color:var(--text3);font-size:11px">— ${c.colorName} cable · ${c.points.length} points</span></div>
      <button class="btn btn-danger" style="padding:4px 10px;font-size:11px" onclick="removeCable(${i})">✕</button>
    </div>`).join('');
}

window.removeCable=function(i){
  rackState.cables.splice(i,1);
  renderCables();updateCableList();
};

window.undoLast=function(){
  const last=rackState.history.pop();if(!last)return;
  if(last.type==='cable')rackState.cables.pop();
  else if(last.type==='label')rackState.labels.pop();
  renderCables();updateCableList();
};

window.clearRack=function(){
  if(!confirm('Clear all traced cables and labels?'))return;
  rackState.cables=[];rackState.labels=[];rackState.history=[];
  renderCables();updateCableList();
};

window.setMode=function(m){
  rackState.mode=m;
  const canvas=document.getElementById('rack-canvas');
  if(canvas)canvas.style.cursor=m==='trace'?'crosshair':m==='label'?'text':'default';
  ['trace','label','pan'].forEach(x=>{
    const btn=document.getElementById('mode-'+x);
    if(btn)btn.className=x===m?'btn btn-outline':'btn btn-ghost';
  });
};

window.saveRackCapture=function(){
  const canvas=document.getElementById('rack-canvas');
  if(!canvas)return;
  // Composite: original image + overlaid canvas
  const out=document.createElement('canvas');
  out.width=canvas.width;out.height=canvas.height;
  const ctx2=out.getContext('2d');
  const img=document.getElementById('rack-img');
  ctx2.drawImage(img,0,0,out.width,out.height);
  ctx2.drawImage(canvas,0,0);
  rackState.savedCapture=out.toDataURL('image/png');
  showToast('Rack capture saved ✓');
};

window.downloadRack=function(){
  const canvas=document.getElementById('rack-canvas');if(!canvas)return;
  const out=document.createElement('canvas');
  out.width=canvas.width;out.height=canvas.height;
  const ctx2=out.getContext('2d');
  const img=document.getElementById('rack-img');
  ctx2.drawImage(img,0,0,out.width,out.height);
  ctx2.drawImage(canvas,0,0);
  const a=document.createElement('a');
  a.href=out.toDataURL('image/png');
  a.download='rack-capture-'+Date.now()+'.png';
  a.click();
  showToast('Rack capture exported');
};

window.addEventListener('resize',()=>{
  if(rackState.imgEl&&document.getElementById('rack-editor').style.display!=='none'){
    setTimeout(()=>{setupCanvas();renderCables()},100);
  }
});
