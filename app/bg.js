// Animated background — changes per section
(function(){
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId, currentScene = 0, targetScene = 0, sceneBlend = 0;

  // Scene palettes per section — [bg1, bg2, accent, particle]
  const SCENES = [
    { name:'site-info',   bg:['#001428','#000E1E'], accent:'#00B7D9', particle:'rgba(0,183,217,', grid:true,  dots:true  },
    { name:'location',    bg:['#001420','#001B30'], accent:'#4ADE80', particle:'rgba(74,222,128,', grid:false, dots:true  },
    { name:'existing-eq', bg:['#140028','#0E001E'], accent:'#818CF8', particle:'rgba(129,140,248,', grid:true, dots:false },
    { name:'cabling',     bg:['#1A1000','#120C00'], accent:'#FBB843', particle:'rgba(251,184,67,', grid:false, dots:true  },
    { name:'future-eq',   bg:['#001428','#001820'], accent:'#00B7D9', particle:'rgba(0,183,217,', grid:true,  dots:true  },
    { name:'contacts',    bg:['#1E0014','#140010'], accent:'#F472B6', particle:'rgba(244,114,182,', grid:false, dots:true  },
    { name:'findings',    bg:['#001428','#000E1E'], accent:'#00B7D9', particle:'rgba(0,183,217,', grid:true,  dots:true  },
  ];
  const SECTION_NAMES = ['site-info','location','existing-eq','cabling','future-eq','contacts','findings'];

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor(scene){
      this.reset(scene);
    }
    reset(si){
      this.x = Math.random()*W;
      this.y = Math.random()*H;
      this.r = Math.random()*1.5+0.3;
      this.vx = (Math.random()-0.5)*0.3;
      this.vy = (Math.random()-0.5)*0.3;
      this.life = Math.random();
      this.maxLife = Math.random()*0.5+0.5;
      this.scene = si;
    }
    update(){
      this.x += this.vx; this.y += this.vy;
      this.life += 0.002;
      if(this.life>this.maxLife || this.x<0 || this.x>W || this.y<0 || this.y>H) this.reset(this.scene);
    }
    draw(ctx, alpha, si){
      const s = SCENES[si];
      const a = Math.sin((this.life/this.maxLife)*Math.PI)*alpha;
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle = s.particle+a+')';
      ctx.fill();
    }
  }

  // Grid lines
  function drawGrid(ctx, scene, alpha){
    if(!scene.grid) return;
    ctx.strokeStyle = scene.particle+(0.06*alpha)+')';
    ctx.lineWidth = 0.5;
    const spacing = 60;
    for(let x=0;x<W;x+=spacing){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}
    for(let y=0;y<H;y+=spacing){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
  }

  // Floating orbs
  let orbs = [{x:0.2,y:0.3,r:300},{x:0.8,y:0.7,r:250},{x:0.5,y:0.1,r:200}];
  let orbT = 0;

  function drawOrbs(ctx, scene, alpha){
    orbs.forEach((o,i)=>{
      const px = (o.x + Math.sin(orbT*0.3+i)*0.08)*W;
      const py = (o.y + Math.cos(orbT*0.2+i)*0.06)*H;
      const grad = ctx.createRadialGradient(px,py,0,px,py,o.r);
      grad.addColorStop(0, scene.particle+(0.08*alpha)+')');
      grad.addColorStop(1, scene.particle+'0)');
      ctx.beginPath();
      ctx.arc(px,py,o.r,0,Math.PI*2);
      ctx.fillStyle = grad;
      ctx.fill();
    });
  }

  // Scan line
  let scanY = 0;
  function drawScan(ctx, scene, alpha){
    const grad = ctx.createLinearGradient(0,scanY-40,0,scanY+2);
    grad.addColorStop(0,'transparent');
    grad.addColorStop(1, scene.particle+(0.12*alpha)+')');
    ctx.fillStyle = grad;
    ctx.fillRect(0,scanY-40,W,42);
    scanY = (scanY+0.5)%H;
  }

  // Hexagon network (for grid scenes)
  let hexNodes = [];
  function initHex(){
    hexNodes = [];
    const cols = Math.ceil(W/120), rows = Math.ceil(H/100);
    for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
      hexNodes.push({
        x:(c+0.5*(r%2))*120+Math.random()*20-10,
        y:r*100+Math.random()*20-10,
        pulse:Math.random()*Math.PI*2
      });
    }
  }

  function drawHex(ctx, scene, alpha){
    if(!scene.dots || hexNodes.length===0) return;
    const t = Date.now()/1000;
    hexNodes.forEach(n=>{
      const a = (Math.sin(t*0.8+n.pulse)*0.5+0.5)*0.4*alpha;
      ctx.beginPath();
      ctx.arc(n.x,n.y,2,0,Math.PI*2);
      ctx.fillStyle = scene.particle+a+')';
      ctx.fill();
    });
    // Connect nearby nodes
    ctx.lineWidth = 0.4;
    for(let i=0;i<hexNodes.length;i++){
      for(let j=i+1;j<hexNodes.length;j++){
        const dx=hexNodes[i].x-hexNodes[j].x, dy=hexNodes[i].y-hexNodes[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<130){
          const a=(1-d/130)*0.15*alpha;
          ctx.strokeStyle=scene.particle+a+')';
          ctx.beginPath();ctx.moveTo(hexNodes[i].x,hexNodes[i].y);ctx.lineTo(hexNodes[j].x,hexNodes[j].y);ctx.stroke();
        }
      }
    }
  }

  function init(){
    resize(); initHex();
    particles = Array.from({length:80},()=>new Particle(0));
  }

  function lerp(a,b,t){return a+(b-a)*t}

  function draw(){
    orbT += 0.005;
    const si = currentScene;
    const scene = SCENES[si];

    // Background gradient
    const g = ctx.createLinearGradient(0,0,W,H);
    g.addColorStop(0,scene.bg[0]);
    g.addColorStop(1,scene.bg[1]);
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);

    drawGrid(ctx,scene,1);
    drawOrbs(ctx,scene,1);
    drawHex(ctx,scene,1);
    drawScan(ctx,scene,0.6);
    particles.forEach(p=>{ p.update(); p.draw(ctx,0.8,si); });

    animId = requestAnimationFrame(draw);
  }

  function setScene(name){
    const idx = SECTION_NAMES.indexOf(name);
    if(idx>=0 && idx!==currentScene){
      currentScene = idx;
      particles.forEach(p=>p.reset(idx));
      initHex();
    }
  }

  window.addEventListener('resize',()=>{resize();initHex()});
  init();
  draw();
  window._setBgScene = setScene;
})();
