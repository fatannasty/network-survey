(function(){
  const canvas=document.getElementById('bg-canvas');
  const ctx=canvas.getContext('2d');
  let W,H,orbs=[],particles=[],stars=[],animId;
  let currentScene=0;
  let orbT=0,scanY=0;

  // Per-section scene configs
  const SCENES=[
    {name:'site-info',   bg1:'#000814',bg2:'#001428',orb1:'rgba(0,58,120,',   orb2:'rgba(0,183,217,',  particles:'rgba(0,183,217,'},
    {name:'location',    bg1:'#010814',bg2:'#001520',orb1:'rgba(0,100,60,',   orb2:'rgba(0,220,100,',  particles:'rgba(0,220,100,'},
    {name:'existing-eq', bg1:'#080010',bg2:'#120020',orb1:'rgba(80,0,150,',   orb2:'rgba(124,58,237,', particles:'rgba(167,139,250,'},
    {name:'cabling',     bg1:'#100800',bg2:'#1A1000',orb1:'rgba(120,60,0,',   orb2:'rgba(251,184,67,', particles:'rgba(251,184,67,'},
    {name:'future-eq',   bg1:'#000814',bg2:'#001428',orb1:'rgba(0,58,120,',   orb2:'rgba(0,183,217,',  particles:'rgba(0,183,217,'},
    {name:'contacts',    bg1:'#100010',bg2:'#180018',orb1:'rgba(120,0,80,',   orb2:'rgba(244,114,182,',particles:'rgba(244,114,182,'},
    {name:'findings',    bg1:'#000814',bg2:'#001428',orb1:'rgba(0,58,120,',   orb2:'rgba(0,183,217,',  particles:'rgba(0,183,217,'},
  ];
  const SECTION_NAMES=SCENES.map(s=>s.name);

  function resize(){
    W=canvas.width=window.innerWidth;
    H=canvas.height=window.innerHeight;
    initStars();
  }

  function initStars(){
    stars=Array.from({length:200},()=>({
      x:Math.random()*W,y:Math.random()*H,
      r:Math.random()*1.2+0.2,
      a:Math.random()*0.6+0.1,
      twinkle:Math.random()*Math.PI*2
    }));
  }

  function initOrbs(){
    orbs=[
      {x:0.15,y:0.25,rx:W*0.5,ry:H*0.55,speed:0.18,phase:0},
      {x:0.85,y:0.70,rx:W*0.45,ry:H*0.5, speed:0.12,phase:1.8},
      {x:0.50,y:0.05,rx:W*0.35,ry:H*0.4, speed:0.22,phase:3.5},
    ];
  }

  class Particle{
    constructor(){this.reset()}
    reset(){
      this.x=Math.random()*W;this.y=Math.random()*H;
      this.vx=(Math.random()-0.5)*0.4;this.vy=-Math.random()*0.5-0.1;
      this.r=Math.random()*1.2+0.2;this.life=0;this.maxLife=Math.random()*200+100;
    }
    update(){this.x+=this.vx;this.y+=this.vy;this.life++;if(this.life>this.maxLife)this.reset()}
    draw(sc){
      const a=Math.sin(this.life/this.maxLife*Math.PI)*0.6;
      ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle=sc.particles+a+')';ctx.fill();
    }
  }

  function init(){
    resize();initOrbs();
    particles=Array.from({length:60},()=>new Particle());
  }

  // Draw globe-like rings (like the screenshot)
  function drawGlobe(sc){
    const cx=W*0.5,cy=H*0.62,rx=Math.min(W,H)*0.32;
    ctx.save();
    // Glow
    const grd=ctx.createRadialGradient(cx,cy,0,cx,cy,rx*1.2);
    grd.addColorStop(0,sc.orb2+'0.06)');grd.addColorStop(1,sc.orb2+'0)');
    ctx.fillStyle=grd;ctx.beginPath();ctx.arc(cx,cy,rx*1.2,0,Math.PI*2);ctx.fill();
    // Rings
    for(let i=0;i<5;i++){
      const ry2=rx*(0.15+i*0.07);const alpha=0.04-i*0.006;
      ctx.beginPath();ctx.ellipse(cx,cy,rx,ry2,0,0,Math.PI*2);
      ctx.strokeStyle=sc.orb2+Math.max(0,alpha)+')';ctx.lineWidth=0.8;ctx.stroke();
    }
    // Vertical meridians
    for(let i=0;i<6;i++){
      const angle=orbT*0.05+i*(Math.PI/3);
      ctx.beginPath();ctx.ellipse(cx,cy,rx*Math.abs(Math.cos(angle)),rx,Math.PI/2,0,Math.PI*2);
      ctx.strokeStyle=sc.orb2+'0.03)';ctx.lineWidth=0.5;ctx.stroke();
    }
    // Horizon glow
    const hg=ctx.createLinearGradient(cx-rx,cy,cx+rx,cy);
    hg.addColorStop(0,sc.orb2+'0)');hg.addColorStop(0.5,sc.orb2+'0.12)');hg.addColorStop(1,sc.orb2+'0)');
    ctx.fillStyle=hg;ctx.beginPath();ctx.ellipse(cx,cy,rx,rx*0.08,0,0,Math.PI*2);ctx.fill();
    ctx.restore();
  }

  function drawOrbs(sc){
    orbs.forEach((o,i)=>{
      const px=(o.x+Math.sin(orbT*o.speed+o.phase)*0.12)*W;
      const py=(o.y+Math.cos(orbT*o.speed*0.7+o.phase)*0.09)*H;
      const r=Math.min(W,H)*(0.28+i*0.04);
      const g=ctx.createRadialGradient(px,py,0,px,py,r);
      const col=i===0?sc.orb1:sc.orb2;
      g.addColorStop(0,col+'0.12)');g.addColorStop(0.5,col+'0.04)');g.addColorStop(1,col+'0)');
      ctx.beginPath();ctx.arc(px,py,r,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
    });
  }

  function drawStars(sc){
    const t=Date.now()/1000;
    stars.forEach(s=>{
      const a=s.a*(0.5+0.5*Math.sin(t*0.8+s.twinkle));
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${a})`;ctx.fill();
    });
  }

  function drawGrid(sc){
    ctx.strokeStyle=sc.particles+'0.04)';ctx.lineWidth=0.5;
    const sp=70;
    for(let x=0;x<W;x+=sp){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}
    for(let y=0;y<H;y+=sp){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
  }

  function drawScan(sc){
    scanY=(scanY+0.4)%H;
    const g=ctx.createLinearGradient(0,scanY-60,0,scanY+2);
    g.addColorStop(0,'transparent');g.addColorStop(1,sc.particles+'0.08)');
    ctx.fillStyle=g;ctx.fillRect(0,scanY-60,W,62);
  }

  // Vertical light beam like in the screenshot
  function drawBeam(sc){
    const bx=W*0.5;
    const g=ctx.createLinearGradient(bx-120,0,bx+120,0);
    g.addColorStop(0,sc.orb2+'0)');g.addColorStop(0.5,sc.orb2+'0.06)');g.addColorStop(1,sc.orb2+'0)');
    ctx.fillStyle=g;ctx.fillRect(bx-120,0,240,H);
  }

  function draw(){
    orbT+=0.004;
    const sc=SCENES[currentScene];
    // BG gradient
    const bg=ctx.createLinearGradient(0,0,W,H);
    bg.addColorStop(0,sc.bg1);bg.addColorStop(1,sc.bg2);
    ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    drawStars(sc);
    drawGrid(sc);
    drawBeam(sc);
    drawOrbs(sc);
    drawGlobe(sc);
    drawScan(sc);
    particles.forEach(p=>{p.update();p.draw(sc)});
    animId=requestAnimationFrame(draw);
  }

  function setScene(name){
    const idx=SECTION_NAMES.indexOf(name);
    if(idx>=0&&idx!==currentScene){currentScene=idx;particles.forEach(p=>p.reset())}
  }

  window.addEventListener('resize',resize);
  init();draw();
  window._setBgScene=setScene;
})();
