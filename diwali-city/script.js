(async()=>{
const THREE=await import('three');
const {OrbitControls}=await import('three/addons/controls/OrbitControls.js');
const {EffectComposer}=await import('three/addons/postprocessing/EffectComposer.js');
const {RenderPass}=await import('three/addons/postprocessing/RenderPass.js');
const {UnrealBloomPass}=await import('three/addons/postprocessing/UnrealBloomPass.js');
const {OutputPass}=await import('three/addons/postprocessing/OutputPass.js');
const $=s=>document.querySelector(s),R=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.random()*a.length|0];
const mobile=innerWidth<768||/Mobi|Android/i.test(navigator.userAgent);
const V3=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z),C=c=>new THREE.Color(c);
const M4=(x,y,z,sx=1,sy=1,sz=1,ry=0)=>new THREE.Matrix4().compose(V3(x,y,z),new THREE.Quaternion().setFromEuler(new THREE.Euler(0,ry,0)),V3(sx,sy,sz));
const FEST=[0xffd27a,0xff5fa2,0x5fd0ff,0xff8a3d,0x9d7bff,0x7dff9a,0xffe9a8],PAST=[0xf3d9b1,0xe9b7a0,0xc9d8e8,0xf2c6d6,0xd9e6c3,0xf6e3a7,0xd8c4ec,0xf4b183];
const GREENS=[0x2e7d32,0x3f9142,0x1f6b34,0x558b2f,0x2a8a4a];

// ---------- renderer / scene / camera ----------
const renderer=new THREE.WebGLRenderer({canvas:$('#c'),antialias:!mobile,powerPreference:'high-performance'});
let pr=Math.min(devicePixelRatio,mobile?1.5:2);renderer.setPixelRatio(pr);renderer.setSize(innerWidth,innerHeight);
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x1a1240,.0026);
const cam=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.5,1500);
const HOME={p:V3(0,125,205),t:V3(0,0,-25)};cam.position.copy(HOME.p);
const ctl=new OrbitControls(cam,renderer.domElement);
Object.assign(ctl,{enableDamping:true,dampingFactor:.06,maxPolarAngle:Math.PI*.48,minDistance:8,maxDistance:380,autoRotate:true,autoRotateSpeed:.35});ctl.target.copy(HOME.t);
const U={t:{value:0},g:{value:1}};
const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,cam));
const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth/(mobile?2:1),innerHeight/(mobile?2:1)),.9,.6,.2);composer.addPass(bloom);composer.addPass(new OutputPass());

// ---------- shared helpers ----------
const mats=new Map(),mat=(c,o={})=>{const k=c+JSON.stringify(o);if(!mats.has(k))mats.set(k,new THREE.MeshStandardMaterial({color:c,roughness:.7,...o}));return mats.get(k)};
const L={},lst=k=>L[k]||(L[k]=[]);
const G={lp:[],lc:[],dp:[],dc:[]};
const lite=(p,col)=>{const k=C(col);G.lp.push(p.x,p.y,p.z);G.lc.push(k.r,k.g,k.b)};
const strand=(a,b,n,sag=0,cols=FEST)=>{for(let i=0;i<=n;i++){const t=i/n,p=a.clone().lerp(b,t);p.y-=sag*4*t*(1-t);lite(p,Array.isArray(cols)?cols[i%cols.length]:cols)}};
const flameP=p=>{G.dp.push(p.x,p.y+.25,p.z);G.dc.push(1,.62,.15)};
const diya=(p,s=1)=>{lst('diya').push(M4(p.x,p.y,p.z,s,s,s));lst('flame').push(M4(p.x,p.y+.2*s,p.z,s,s,s));flameP(p)};
function inst(geo,m,list,cols){if(!list.length)return;const o=new THREE.InstancedMesh(geo,m,list.length);list.forEach((x,i)=>{o.setMatrixAt(i,x);if(cols)o.setColorAt(i,C(cols[i]))});scene.add(o);return o}
function glowTex(){const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'#fff');g.addColorStop(.25,'rgba(255,200,100,.6)');g.addColorStop(1,'rgba(255,150,40,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)}
const GT=glowTex();
const glowMat=s=>new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{t:U.t,g:U.g,s:{value:s}},
vertexShader:`attribute float ph;attribute float al;attribute vec3 col;varying vec3 c;varying float a;uniform float t,s;void main(){c=col;a=al*(.7+.3*sin(t*(3.+ph*5.)+ph*40.));vec4 m=modelViewMatrix*vec4(position,1.);gl_PointSize=min(s*(.8+ph*.5)*(60./-m.z),48.);gl_Position=projectionMatrix*m;}`,
fragmentShader:`varying vec3 c;varying float a;uniform float g;void main(){float d=length(gl_PointCoord-.5);float k=smoothstep(.5,0.,d);gl_FragColor=vec4(c*k*k*1.5*g,k*a*g);}`});
function mkPts(p,c,size,a=1){const n=p.length/3,g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('col',new THREE.Float32BufferAttribute(c,3));g.setAttribute('ph',new THREE.Float32BufferAttribute(Array.from({length:n},()=>Math.random()),1));g.setAttribute('al',new THREE.Float32BufferAttribute(new Float32Array(n).fill(a),1));const o=new THREE.Points(g,glowMat(size));o.frustumCulled=false;scene.add(o);return o}

// ---------- particle pool (sparks, smoke, spray) ----------
class Pool{constructor(n,size,grav,k=1,drag=.995){Object.assign(this,{n,i:0,g:grav,k,drag});this.pos=new Float32Array(n*3);this.col=new Float32Array(n*3);this.al=new Float32Array(n);this.vel=new Float32Array(n*3);this.age=new Float32Array(n).fill(9);this.life=new Float32Array(n).fill(1);
const g=new THREE.BufferGeometry();this.pa=new THREE.BufferAttribute(this.pos,3).setUsage(THREE.DynamicDrawUsage);this.ca=new THREE.BufferAttribute(this.col,3).setUsage(THREE.DynamicDrawUsage);this.aa=new THREE.BufferAttribute(this.al,1).setUsage(THREE.DynamicDrawUsage);
g.setAttribute('position',this.pa);g.setAttribute('col',this.ca);g.setAttribute('al',this.aa);g.setAttribute('ph',new THREE.Float32BufferAttribute(Array.from({length:n},()=>Math.random()),1));
this.pts=new THREE.Points(g,glowMat(size));this.pts.frustumCulled=false;scene.add(this.pts)}
spawn(x,y,z,vx,vy,vz,c,l){const i=this.i;this.i=(i+1)%this.n;const k=i*3;this.pos[k]=x;this.pos[k+1]=y;this.pos[k+2]=z;this.vel[k]=vx;this.vel[k+1]=vy;this.vel[k+2]=vz;this.col[k]=c.r;this.col[k+1]=c.g;this.col[k+2]=c.b;this.age[i]=0;this.life[i]=l;this.dirty=1}
update(dt){const d=Math.pow(this.drag,dt*60);for(let i=0;i<this.n;i++){if(this.age[i]>=this.life[i]){this.al[i]=0;continue}this.age[i]+=dt;const k=i*3;this.vel[k+1]-=this.g*dt;this.vel[k]*=d;this.vel[k+1]*=d;this.vel[k+2]*=d;this.pos[k]+=this.vel[k]*dt;this.pos[k+1]+=this.vel[k+1]*dt;this.pos[k+2]+=this.vel[k+2]*dt;this.al[i]=Math.pow(Math.max(0,1-this.age[i]/this.life[i]),1.5)*this.k}this.pa.needsUpdate=this.aa.needsUpdate=true;if(this.dirty){this.ca.needsUpdate=true;this.dirty=0}}}
const sparks=new Pool(mobile?2500:6000,13,9),smoke=new Pool(mobile?150:400,60,-.6,.22,.98),spray=new Pool(400,7,12,.9);

// ---------- sky, stars, moon, lights ----------
const skyU={top:{value:C(0x040822)},bot:{value:C(0x4a2160)}};
const sky=new THREE.Mesh(new THREE.SphereGeometry(1000,24,16),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,uniforms:skyU,vertexShader:'varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 p;uniform vec3 top,bot;void main(){float h=normalize(p).y;gl_FragColor=vec4(mix(bot,top,smoothstep(0.,.55,h)),1.);}'}));scene.add(sky);
const stars=(()=>{const p=[],c=[];for(let i=0;i<(mobile?500:1000);i++){const a=R(0,6.28),e=Math.acos(R(.02,1)),r=900;p.push(r*Math.sin(e)*Math.cos(a),r*Math.cos(e),r*Math.sin(e)*Math.sin(a));const k=R(.6,1);c.push(k,k,1)}return mkPts(p,c,70)})();
const moon=new THREE.Mesh(new THREE.SphereGeometry(18,24,16),new THREE.MeshBasicMaterial({color:0xfff4d6,fog:false}));moon.position.set(-300,260,-520);scene.add(moon);
const halo=new THREE.Sprite(new THREE.SpriteMaterial({map:GT,color:0xfff0c0,blending:THREE.AdditiveBlending,fog:false,depthWrite:false}));halo.scale.setScalar(190);halo.position.copy(moon.position);scene.add(halo);
const amb=new THREE.AmbientLight(0x4a5aa0,.6),sun=new THREE.DirectionalLight(0x8fa4ff,.75);sun.position.set(-120,160,-80);scene.add(amb,sun);
const flash=new THREE.PointLight(0xffffff,0,260,1.5);flash.position.set(0,90,-110);scene.add(flash);

// ---------- ground, roads ----------
function noiseTex(base,vary,rep,sz=128){const c=document.createElement('canvas');c.width=c.height=sz;const x=c.getContext('2d');x.fillStyle=base;x.fillRect(0,0,sz,sz);for(let i=0;i<sz*sz/6;i++){x.fillStyle=pick(vary);x.globalAlpha=.35;x.fillRect(Math.random()*sz,Math.random()*sz,2,2)}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rep,rep);t.colorSpace=THREE.SRGBColorSpace;return t}
const grass=new THREE.Mesh(new THREE.PlaneGeometry(800,800),new THREE.MeshStandardMaterial({map:noiseTex('#1f5a2a',['#2f7a35','#174a22','#3e8a3a'],70),roughness:1}));grass.rotation.x=-Math.PI/2;scene.add(grass);
const asph=new THREE.MeshStandardMaterial({map:noiseTex('#1b1c24',['#2a2b35','#111','#34343f'],1),roughness:.35,metalness:.2});
const flat=(w,d,m,x,y,z)=>{const o=new THREE.Mesh(new THREE.PlaneGeometry(w,d),m);o.rotation.x=-Math.PI/2;o.position.set(x,y,z);scene.add(o);return o};
const CZ=[-55,10,75],SX=[-65,65];
flat(18,240,asph,0,.03,-5);CZ.forEach(z=>flat(240,14,asph,0,.03,z));SX.forEach(x=>flat(12,240,asph,x,.03,-5));
const ring=new THREE.Mesh(new THREE.RingGeometry(10,19,48),asph);ring.rotation.x=-Math.PI/2;ring.position.set(0,.04,10);scene.add(ring);
// markings + sidewalks
const dash=[],cross=[],walk=[],walkC=[];
for(let z=-118;z<118;z+=6){if(CZ.some(c=>Math.abs(z-c)<10)||Math.abs(z-10)<20)continue;dash.push(M4(0,.05,z,.3,1,3.2),M4(65,.05,z,.2,1,3),M4(-65,.05,z,.2,1,3))}
for(const x of [-9,9])for(let z=-115;z<115;z+=5)if(!CZ.some(c=>Math.abs(z-c)<8)&&Math.abs(z-10)>=19){}
for(let x=-110;x<110;x+=6){if(Math.abs(x)<12||SX.some(s=>Math.abs(x-s)<8))continue;CZ.forEach(z=>dash.push(M4(x,.05,z,3.2,1,.25)))}
CZ.forEach(z=>{for(let i=-3;i<=3;i++){cross.push(M4(i*2.2,.06,z-8.6,1,1,2.2),M4(i*2.2,.06,z+8.6,1,1,2.2));[-65,65].forEach(x=>cross.push(M4(x+i*1.6,.06,z-8.6,.8,1,2.2),M4(x+i*1.6,.06,z+8.6,.8,1,2.2)))}});
const pave=(x,z,w,d)=>{walk.push(M4(x,.14,z,w,.28,d));walkC.push(pick([0x8a7f74,0x7d7168,0x948679]))};
[[-115,-62],[-48,3],[17,68],[82,115]].forEach(([a,b])=>{const m=(a+b)/2,l=b-a;[-11,11].forEach(x=>pave(x,m,4,l));SX.forEach(sx=>[-1,1].forEach(s=>pave(sx+s*8,m,4,l)))});
CZ.forEach(z=>{[-1,1].forEach(s=>{const zz=z+s*9;[[-115,-71],[-59,-9],[9,59],[71,115]].forEach(([a,b])=>pave((a+b)/2,zz,b-a,4))})});
const unit=new THREE.PlaneGeometry(1,1).rotateX(-Math.PI/2);
inst(unit,new THREE.MeshBasicMaterial({color:0xffd966}),dash);inst(unit,new THREE.MeshBasicMaterial({color:0xf0f0f0}),cross);
inst(new THREE.BoxGeometry(1,1,1),mat(0xffffff,{roughness:.9}),walk,walkC);

// ---------- textures for windows ----------
const winCache={};
function winTex(floors,type){const k=floors+type;if(winCache[k])return winCache[k];const W=128,H=floors*48,mk=()=>{const c=document.createElement('canvas');c.width=W;c.height=H;return c},a=mk(),b=mk(),x=a.getContext('2d'),y=b.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,W,H);y.fillStyle='#000';y.fillRect(0,0,W,H);
for(let f=0;f<floors;f++)for(let i=0;i<4;i++){const wx=i*32+7,wy=H-(f+1)*48+10;x.fillStyle='#3a3a4a';x.fillRect(wx,wy,18,26);if(type==='trad'){x.beginPath();x.arc(wx+9,wy,9,Math.PI,0);x.fill()}if(Math.random()<.8){y.fillStyle=pick(['#ffd27a','#ffb454','#ffe9b0','#ff9a4a']);y.fillRect(wx,wy,18,26)}}
const t1=new THREE.CanvasTexture(a),t2=new THREE.CanvasTexture(b);t1.colorSpace=t2.colorSpace=THREE.SRGBColorSpace;return winCache[k]=[t1,t2]}

// ---------- rangoli ----------
const rTex=[];
for(let v=0;v<4;v++){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');x.translate(128,128);const pal=[...FEST].sort(()=>Math.random()-.5).map(h=>'#'+h.toString(16).padStart(6,'0'));const petals=8+v*2;
for(let r=120,i=0;r>10;r-=18,i++){x.fillStyle=pal[i%pal.length];for(let p=0;p<petals;p++){x.save();x.rotate(p*6.283/petals+i*.2);x.beginPath();x.ellipse(0,-r*.7,r*.12,r*.28,0,0,6.283);x.fill();x.restore()}x.beginPath();x.arc(0,0,r*.5,0,6.283);x.strokeStyle=pal[(i+2)%pal.length];x.lineWidth=3;x.stroke()}
x.fillStyle='#fff';x.beginPath();x.arc(0,0,8,0,6.283);x.fill();const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;rTex.push(t)}
function createRangoli(x,z,r){const t=pick(rTex),o=new THREE.Mesh(new THREE.CircleGeometry(r,32),new THREE.MeshStandardMaterial({map:t,emissiveMap:t,emissive:0xffffff,emissiveIntensity:.35,transparent:true,roughness:1}));o.rotation.set(-Math.PI/2,0,Math.random()*6);o.position.set(x,.3,z);scene.add(o);for(let i=0;i<6;i++){const a=i*1.047;diya(V3(x+Math.cos(a)*(r+.5),.3,z+Math.sin(a)*(r+.5)),.9)}}

// ---------- buildings ----------
const pickables=[],bMats=[],BN=['Lakshmi Niwas','Deepak Apartments','Rangoli Residency','Ganesh Bhawan','Kamal Haveli','Diwali Bazaar','Shubh Labh Tower','Anand Kunj','Sitara Heights','Mohan Market','Jyoti Villa','Ayodhya Court'];
const boxG=new THREE.BoxGeometry(1,1,1),cylG=new THREE.CylinderGeometry(1,1,1,16),domeG=new THREE.SphereGeometry(1,16,8,0,6.283,0,1.571);
const gold=new THREE.MeshStandardMaterial({color:0xffc94a,emissive:0xaa6a10,emissiveIntensity:.8,metalness:.6,roughness:.35}),cream=mat(0xf7e2c0,{emissive:0x4a3414});
function createBuilding(x,z,w,d,h,type){
 const floors=Math.max(2,Math.round(h/3.6));h=floors*3.6;const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=Math.abs(x)<65?(x>0?-Math.PI/2:Math.PI/2):(x>0?-Math.PI/2:Math.PI/2);g.updateMatrix();
 const [tm,te]=winTex(floors,type),m=new THREE.MeshStandardMaterial({color:pick(PAST),map:tm,emissiveMap:te,emissive:0xffffff,emissiveIntensity:.9,roughness:.8});
 const body=new THREE.Mesh(boxG,m);body.scale.set(w,h,d);body.position.y=h/2;body.userData={b:1,name:pick(BN)};g.add(body);pickables.push(body);bMats.push(m);
 const wp=(a,b,c)=>V3(a,b,c).applyMatrix4(g.matrix),ry=g.rotation.y;
 if(type==='trad'){const r=new THREE.Mesh(new THREE.ConeGeometry(w*.78,3,4),mat(0xb5532e,{roughness:.9}));r.rotation.y=Math.PI/4;r.position.y=h+1.5;g.add(r);
  const arch=new THREE.Mesh(new THREE.TorusGeometry(1,.14,8,16,Math.PI),gold);arch.position.set(0,1.6,d/2+.05);g.add(arch);
  [-1,1].forEach(s=>{const dm=new THREE.Mesh(domeG,gold);dm.scale.set(.9,.9,.9);dm.position.set(s*w*.42,h,d*.42);g.add(dm)})}
 else{const sl=new THREE.Mesh(boxG,mat(0x55555f));sl.scale.set(w+.5,.5,d+.5);sl.position.y=h+.25;g.add(sl);if(type==='mod'){const tk=new THREE.Mesh(cylG,mat(0x777788));tk.scale.set(.9,1.6,.9);tk.position.set(w*.25,h+1.3,-d*.2);g.add(tk)}else{const aw=new THREE.Mesh(boxG,new THREE.MeshStandardMaterial({color:pick([0xff5fa2,0xff8a3d,0x5fd0ff]),emissive:0x331100}));aw.scale.set(w*.9,.3,1.6);aw.position.set(0,3,d/2+.8);aw.rotation.x=.3;g.add(aw)}}
 for(let f=1;f<floors;f++){const y=f*3.6;const bp=wp(0,y-.1,d/2+.6);lst('balc').push(M4(bp.x,bp.y,bp.z,w*.8,.25,1.4,ry));
  [-1,0,1].forEach(s=>{if(Math.random()<.7)diya(wp(s*w*.3,y+.2,d/2+.9))});
  lst('lant').push(M4(...wp(-w*.3,y-.9,d/2+1.1).toArray(),.35,.45,.35));lst('lantC').push(pick(FEST));
  strand(wp(-w/2,y+.2,d/2+.1),wp(w/2,y+.2,d/2+.1),Math.round(w*1.2),.25)}
 strand(wp(-w/2,h+.6,d/2+.1),wp(w/2,h+.6,d/2+.1),Math.round(w*1.5),.2,[0xffd27a,0xffb347]);
 [-1,1].forEach(s=>strand(wp(s*w/2,0,d/2+.1),wp(s*w/2,h,d/2+.1),floors*3));
 for(let a=0;a<=10;a++){const t=Math.PI*a/10;lite(wp(Math.cos(t)*1.2,1.9+Math.sin(t)*.9,d/2+.3),0xff9a1f)}
 for(let i=0;i<5;i++)lite(wp(-1+i*.5,1.6-Math.abs(i-2)*.2,d/2+.3),0xffb000);
 diya(wp(-1.8,.3,d/2+1.2),1.2);diya(wp(1.8,.3,d/2+1.2),1.2);
 const rp=wp(0,0,d/2+3.6);createRangoli(rp.x,rp.z,2.3);
 scene.add(g);return g}
const bands=[[-103,-88,-73],[-41,-26,-11],[24,39,54],[89,104]],xs=mobile?[21,36,79]:[21,36,51,79,94];
for(const sx of [-1,1])for(const bx of xs)for(const rows of bands)for(const bz of rows){if(bx>=36&&bx<=51&&bz>-35&&bz<-4)continue;if(Math.random()<.08)continue;const r=Math.random(),tp=r<.32?'trad':r<.72?'mod':'shop';createBuilding(sx*bx,bz,R(11,13),R(11,14),tp==='trad'?R(7,11):R(10,26),tp)}
inst(boxG,mat(0xd9c7a8),lst('balc'));
inst(new THREE.SphereGeometry(1,10,8),new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xffffff,emissiveIntensity:.9}),lst('lant'),lst('lantC'));

// ---------- trees, lamps, flowers, benches ----------
const treeMat=new THREE.MeshStandardMaterial({roughness:.9,flatShading:true});
treeMat.onBeforeCompile=s=>{s.uniforms.t=U.t;s.vertexShader='uniform float t;\n'+s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n transformed.x+=sin(t*1.4+instanceMatrix[3].x*.7)*.14*max(position.y+1.,0.);')};
function createTree(x,z,s=1){lst('trunk').push(M4(x,1.4*s,z,.28*s,2.8*s,.28*s));lst('can').push(M4(x,3.6*s,z,1.9*s,1.7*s,1.9*s),M4(x+.4*s,4.8*s,z,1.3*s,1.2*s,1.3*s));lst('canC').push(pick(GREENS),pick(GREENS));if(Math.random()<.4)lite(V3(x,4.2*s,z),pick(FEST))}
function createStreetLight(x,z){lst('pole').push(M4(x,3,z,.12,6,.12));const p=V3(x,6.2,z);G.lp.push(p.x,p.y,p.z);G.lc.push(1,.78,.4);lst('lamp').push(M4(x,6.1,z,.35,.35,.35));lst('decal').push(M4(x,.07,z,16,1,16))}
function createBench(x,z,ry){lst('bench').push(M4(x,.5,z,1.8,.12,.5,ry));lst('bback').push(M4(x-Math.sin(ry)*-.3,.9,z-Math.cos(ry)*.3,1.8,.5,.1,ry))}
for(const sx of [-1,1])for(let z=-112;z<112;z+=18){if(Math.abs(z-10)<22)continue;if(!CZ.some(c=>Math.abs(z-c)<10)){createStreetLight(sx*12.5,z);createTree(sx*13.2,z+9,1.1)}}
for(const sz of [-1,1])for(let x=-105;x<105;x+=18)if(Math.abs(x)>24&&!SX.some(s=>Math.abs(x-s)<9)){createStreetLight(x,CZ[1]+sz*8.5);}
for(const x of SX)for(let z=-100;z<100;z+=26)if(!CZ.some(c=>Math.abs(z-c)<12)&&Math.abs(z-10)>15)createStreetLight(x+9,z);
// hanging lights between buildings across the boulevard + festoon lanterns
for(let z=-100;z<110;z+=15){if(CZ.some(c=>Math.abs(z-c)<9))continue;strand(V3(-13,13,z),V3(13,13,z),40,2.2);for(let i=1;i<6;i++){const p=V3(-13+i*4.33,13-2.2*4*(i/6)*(1-i/6)-.8,z);lst('lant').push(M4(p.x,p.y,p.z,.5,.65,.5));lst('lantC').push(pick(FEST))}}
// marigold garlands along boulevard sidewalk edges
for(const sx of [-1,1])strand(V3(sx*9.3,1.1,-110),V3(sx*9.3,1.1,100),150,0,[0xff8a00,0xffb300,0xff6a00]);

// ---------- parks ----------
function ribbon(pts,wd,y,m){const pos=[],idx=[];pts.forEach((p,i)=>{const q=pts[Math.min(i+1,pts.length-1)],o=pts[Math.max(i-1,0)],t=q.clone().sub(o).normalize();pos.push(p.x-t.z*wd,y,p.z+t.x*wd,p.x+t.z*wd,y,p.z-t.x*wd);if(i<pts.length-1){const a=i*2;idx.push(a,a+2,a+1,a+1,a+2,a+3)}});const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();const o=new THREE.Mesh(g,m);scene.add(o)}
const pathM=new THREE.MeshStandardMaterial({color:0xcdb48a,roughness:.9,side:THREE.DoubleSide});
const FL=[0xff4d6d,0xffd23f,0xff8fab,0xb388ff,0xff7b00,0xffffff];
function flowerBed(cx,cz,r,n){for(let i=0;i<n;i++){const a=R(0,6.28),d=Math.sqrt(Math.random())*r;lst('fl').push(M4(cx+Math.cos(a)*d,.35,cz+Math.sin(a)*d,.22,.22,.22));lst('flC').push(pick(FL))}lst('bush').push(M4(cx,.3,cz,r*2.1,.3,r*2.1));}
function createPark(cx,cz,w,d){const gm=new THREE.Mesh(new THREE.PlaneGeometry(w,d),new THREE.MeshStandardMaterial({color:0x3f9a3d,roughness:1}));gm.rotation.x=-Math.PI/2;gm.position.set(cx,.08,cz);scene.add(gm);
 const pts=new THREE.CatmullRomCurve3([V3(cx-w/2,0,cz-d/3),V3(cx-w/6,0,cz),V3(cx+w/6,0,cz-d/5),V3(cx+w/2,0,cz+d/3)]).getPoints(30);ribbon(pts,1.3,.12,pathM);
 for(let i=0;i<10;i++)createTree(cx+R(-w/2+2,w/2-2),cz+R(-d/2+2,d/2-2),R(.9,1.4));
 for(let i=0;i<4;i++)flowerBed(cx+R(-w/3,w/3),cz+R(-d/3,d/3),R(1.4,2.2),22);
 [-1,1].forEach(s=>{createBench(cx+s*5,cz+3,0);createStreetLight(cx+s*8,cz-4)});
 for(let i=0;i<10;i++){const p=pts[i*3];diya(V3(p.x+1.8,.25,p.z+1.8),1)}
 createRangoli(cx-w/2+3,cz+d/2-3,2.4);createRangoli(cx+w/2-3,cz-d/2+3,2.4);
 const cl=document;}
createPark(-43.5,-19,29,28);createPark(43.5,-19,29,28);
// central garden + fountain at (0,10)
const FC=V3(0,0,10);
(function(){const gm=new THREE.Mesh(new THREE.CircleGeometry(10,40),new THREE.MeshStandardMaterial({color:0x3f9a3d,roughness:1}));gm.rotation.x=-Math.PI/2;gm.position.set(0,.1,10);scene.add(gm);
 const curb=new THREE.Mesh(new THREE.TorusGeometry(10,.35,8,48),mat(0xcfc6b8));curb.rotation.x=Math.PI/2;curb.position.set(0,.3,10);scene.add(curb);
 const basin=new THREE.Mesh(new THREE.CylinderGeometry(5.5,5.8,1,32),mat(0xe8dcc8));basin.position.set(0,.5,10);scene.add(basin);
 window.water=new THREE.Mesh(new THREE.CircleGeometry(5.1,32),new THREE.MeshStandardMaterial({color:0x2a7fd0,emissive:0x1a60b0,emissiveIntensity:.4,roughness:.05,metalness:.6}));water.rotation.x=-Math.PI/2;water.position.set(0,1.02,10);scene.add(water);
 const pil=new THREE.Mesh(new THREE.CylinderGeometry(.5,.8,2.4,12),mat(0xe8dcc8));pil.position.set(0,2,10);scene.add(pil);const bowl=new THREE.Mesh(new THREE.CylinderGeometry(2,.7,.6,20),mat(0xe8dcc8));bowl.position.set(0,3.3,10);scene.add(bowl);
 for(let i=0;i<28;i++){const a=i/28*6.283;diya(V3(Math.cos(a)*6.6,.25,10+Math.sin(a)*6.6),1.1)}
 for(let i=0;i<8;i++){const a=i/8*6.283+.4;flowerBed(Math.cos(a)*8.4,10+Math.sin(a)*8.4,1.1,14);createStreetLight(Math.cos(a+.39)*9.4,10+Math.sin(a+.39)*9.4)}
 for(let i=0;i<4;i++){const a=i*1.571+.78;createRangoli(Math.cos(a)*7.6,10+Math.sin(a)*7.6,1.6)}
 const fl=new THREE.PointLight(0x66aaff,40,40,1.8);fl.position.set(0,4,10);scene.add(fl)})();

// ---------- market stalls ----------
function createStall(x,z,ry,col){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry;const t=new THREE.Mesh(boxG,mat(0x8a5a2b));t.scale.set(3,1,1.4);t.position.y=.6;g.add(t);
 [[-1.4,-.6],[1.4,-.6],[-1.4,.6],[1.4,.6]].forEach(([a,b])=>{const p=new THREE.Mesh(cylG,mat(0x6a4a2a));p.scale.set(.06,2.6,.06);p.position.set(a,1.3,b);g.add(p)});
 const c=new THREE.Mesh(boxG,new THREE.MeshStandardMaterial({color:col,emissive:col,emissiveIntensity:.25}));c.scale.set(3.6,.12,2.2);c.position.set(0,2.7,0);c.rotation.x=.15;g.add(c);
 g.updateMatrix();for(let i=0;i<9;i++){const p=V3(-1.2+i*.3,1.2,R(-.4,.4)).applyMatrix4(g.matrix);lst('fl').push(M4(p.x,p.y,p.z,.16,.16,.16));lst('flC').push(pick([0xff8a00,0xffc400,0xffffff,0xff4d6d]))}
 for(let i=0;i<3;i++)diya(V3(-1+i,1.15,.6).applyMatrix4(g.matrix),.9);
 for(let i=0;i<5;i++)lite(V3(-1.6+i*.8,2.55,1.1).applyMatrix4(g.matrix),0xffd27a);
 for(let i=0;i<3;i++){const p=V3(-1.2+i*1.2,3.1,0).applyMatrix4(g.matrix);lst('ball').push(M4(p.x,p.y,p.z,.35,.45,.35));lst('ballC').push(pick(FEST))}scene.add(g)}
[[-11,-85],[11,-30],[-11,35],[11,60],[-11,-40],[11,45],[-11,95],[11,-95]].forEach(([x,z],i)=>createStall(x,z,x>0?Math.PI/2:-Math.PI/2,FEST[i%7]));

// ---------- landmark ----------
function createLandmark(){const g=new THREE.Group();g.position.set(0,0,-122);
 const add=(geo,m,x,y,z,sx,sy,sz)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);g.add(o);return o};
 add(boxG,cream,0,.5,0,44,1,22);add(boxG,cream,0,1.5,0,40,1,18);add(boxG,cream,0,2.5,0,36,1,14);add(boxG,cream,0,8,0,28,10,10);
 for(let i=-2;i<=2;i++){const a=new THREE.Mesh(new THREE.TorusGeometry(2,.3,8,20,Math.PI),gold);a.position.set(i*5.2,4,5.1);g.add(a);add(boxG,mat(0x2a1208,{emissive:0xff8a2a,emissiveIntensity:.5}),i*5.2,3.2,5.05,3.6,3.2,.1)}
 [0,1,2,3,4].forEach(i=>add(cylG,i%2?gold:cream,0,13+i*3.1,0,5-i*.8,3.1,5-i*.8));add(domeG,gold,0,28.5,0,2.2,2.8,2.2);add(cylG,gold,0,32,0,.15,4,.15);
 [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>{add(cylG,cream,a*15,10,b*4,1.3,16,1.3);add(domeG,gold,a*15,18,b*4,1.9,2.2,1.9);add(cylG,gold,a*15,20.5,b*4,.08,3,.08)});
 g.updateMatrix();const wp=(a,b,c)=>V3(a,b,c).applyMatrix4(g.matrix);
 strand(wp(-14,13,5.2),wp(14,13,5.2),50);strand(wp(-22,3,11.2),wp(22,3,11.2),70,0,[0xffb347,0xffe9a8]);[0,1,2,3,4].forEach(i=>strand(wp(-(4.5-i*.8),13+i*3.1,0),wp(4.5-i*.8,13+i*3.1,0),12,0,0xffd27a));
 for(let i=0;i<20;i++)diya(wp(-18+i*1.9,3.1,11.5),1.3);
 [-1,1].forEach(s=>{const l=new THREE.PointLight(0xffa640,300,110,1.6);l.position.copy(wp(s*18,14,16));scene.add(l)});scene.add(g);
 createRangoli(0,-98,5);createRangoli(-12,-98,3);createRangoli(12,-98,3)}
createLandmark();

// ---------- finalize static instanced meshes ----------
inst(new THREE.CylinderGeometry(1,1,1,8),mat(0x2b2b33,{metalness:.6}),lst('pole'));
inst(new THREE.SphereGeometry(1,10,8),new THREE.MeshBasicMaterial({color:0xffe2a0}),lst('lamp'));
inst(unit,new THREE.MeshBasicMaterial({map:GT,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false,color:0xff9a40}),lst('decal'));
inst(new THREE.CylinderGeometry(1,1.3,1,6),mat(0x5a3a1a),lst('trunk').map(m=>m));
// trunks use unit-height cylinder scaled by M4 (set above); canopy:
const canopy=inst(new THREE.IcosahedronGeometry(1,1),treeMat,lst('can'),lst('canC'));
const dg=new THREE.LatheGeometry([[0,0],[.22,0],[.34,.1],[.4,.2],[.32,.2],[0,.1]].map(p=>new THREE.Vector2(...p)),12);
inst(dg,new THREE.MeshStandardMaterial({color:0xc4602a,emissive:0x401800,roughness:.8}),lst('diya'));
inst(new THREE.ConeGeometry(.07,.24,6),new THREE.MeshBasicMaterial({color:0xffc84a}),lst('flame'));
inst(new THREE.SphereGeometry(1,8,6),new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xffffff,emissiveIntensity:.15}),lst('fl'),lst('flC'));
inst(new THREE.CylinderGeometry(.5,.5,1,10),mat(0x2f8a3a),lst('bush'));
inst(boxG,mat(0x7a4a22),lst('bench'));inst(boxG,mat(0x7a4a22),lst('bback'));
inst(new THREE.SphereGeometry(1,10,8),new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xffffff,emissiveIntensity:.2,roughness:.3}),lst('ball'),lst('ballC'));
const decorGlowP=mkPts(G.lp,G.lc,20),diyaGlow=mkPts(G.dp,G.dc,26);
// floating golden particles
const FP=[],fpC=[];for(let i=0;i<(mobile?120:300);i++){FP.push(R(-120,120),R(2,45),R(-130,120));fpC.push(1,.8,.35)}
const floaters=mkPts(FP,fpC,16,.7);

// ---------- people ----------
const SKIN=[0xf1c27d,0xe0ac69,0xc68642,0x8d5524,0xd9a066],HAIRC=[0x111111,0x1b1209,0x2b1a10],BRIGHT=[0xe63946,0xf77f00,0xffb703,0x2a9d8f,0x8338ec,0xff006e,0x3a86ff,0x06d6a0,0xfb5607];
const PG={leg:new THREE.CylinderGeometry(.1,.09,.85,8).translate(0,-.425,0),skirt:new THREE.CylinderGeometry(.17,.42,.85,12),tor:new THREE.CylinderGeometry(.2,.25,.62,10),torL:new THREE.CylinderGeometry(.21,.28,.95,10),head:new THREE.SphereGeometry(.17,12,10),cap:new THREE.SphereGeometry(.18,12,8,0,6.283,0,1.7),arm:new THREE.CylinderGeometry(.06,.055,.5,6).translate(0,-.25,0),hand:new THREE.SphereGeometry(.06,6,6),eye:new THREE.SphereGeometry(.018,4,4),bun:new THREE.SphereGeometry(.09,8,6),braid:new THREE.CylinderGeometry(.035,.02,.5,5)};
const people=[],sparkers=[],plights=[];
function createPerson(kind,mode,x,z,face=R(0,6.28),path){
 const g=new THREE.Group(),fem=kind==='girl'||kind==='woman',sc={boy:1.2,girl:1.2,kid:.95,man:1.6,woman:1.5}[kind],sk=mat(pick(SKIN)),top=mat(pick(BRIGHT)),hair=mat(pick(HAIRC)),bot=fem?mat(pick(BRIGHT)):mat(pick([0xf5efe0,0xe8e0cc,0x3a3a4a]));
 const add=(geo,m,px,py,pz,p=g)=>{const o=new THREE.Mesh(geo,m);o.position.set(px,py,pz);p.add(o);return o};
 const legs=[];if(fem){add(PG.skirt,bot,0,.48,0)}else[-1,1].forEach(s=>{const l=add(PG.leg,bot,s*.12,.88,0);legs.push(l)});
 add(kind==='man'||kind==='boy'?PG.torL:PG.tor,top,0,fem?1.15:1.05,0);
 if(fem)add(boxG,mat(pick(BRIGHT)),.05,1.2,.02).scale.set(.38,.5,.4);
 add(PG.head,sk,0,1.68,0);[-.06,.06].forEach(e=>add(PG.eye,mat(0x111111),e,1.7,.155));
 add(PG.cap,hair,0,1.7,-.015);if(kind==='girl'){const b=add(PG.braid,hair,0,1.45,-.17);b.rotation.x=.1}if(kind==='woman')add(PG.bun,hair,0,1.78,-.14);
 const arms=[-1,1].map(s=>{const a=new THREE.Group();a.position.set(s*.3,1.42,0);g.add(a);add(PG.arm,top,0,0,0,a);add(PG.hand,sk,0,-.52,0,a);return a});
 const u={mode,ph:R(0,6),legs,arms,head:g.children[fem?3:3]};u.head=g.children.find(c=>c.geometry===PG.head);
 if(mode==='spark'){const rod=add(new THREE.CylinderGeometry(.012,.012,.6,4),new THREE.MeshBasicMaterial({color:0xffe6a0}),0,-.82,0,arms[1]);u.tip=new THREE.Object3D();u.tip.position.set(0,-1.12,0);arms[1].add(u.tip);const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GT,color:0xffe0a0,blending:THREE.AdditiveBlending,depthWrite:false}));sp.scale.setScalar(.8);u.tip.add(sp);u.sp=sp;sparkers.push(u);if(plights.length<5){const pl=new THREE.PointLight(0xffb84d,3,16,1.6);u.tip.add(pl);plights.push(pl);u.pl=pl}}
 if(mode==='photo'){add(boxG,new THREE.MeshBasicMaterial({color:0x9bd8ff}),0,-.55,.05,arms[1]).scale.set(.09,.15,.015)}
 if(path){u.a=V3(...path[0]);u.b=V3(...path[1]);u.to=1}
 g.scale.setScalar(sc);g.position.set(x,.28,z);g.rotation.y=face;g.userData=u;scene.add(g);people.push(g);return g}
function crowd(cx,cz,n,r,modes,kinds){for(let i=0;i<n;i++){const a=i/n*6.283+R(-.3,.3),d=r*R(.6,1.1),px=cx+Math.cos(a)*d,pz=cz+Math.sin(a)*d;createPerson(pick(kinds),pick(modes),px,pz,Math.atan2(cx-px,cz-pz)+R(-.4,.4))}}
const ALL=['boy','girl','woman','man','kid'],KIDS=['boy','girl','kid','girl'];
crowd(0,10,8,8.6,['spark'],KIDS);crowd(0,-98,6,5,['spark','wave'],KIDS);crowd(0,-92,6,9,['watch','photo','idle'],ALL);
crowd(-43.5,-19,mobile?5:8,6,['spark','photo','watch','wave'],ALL);crowd(43.5,-19,mobile?5:8,6,['spark','idle','watch','wave'],ALL);
crowd(-11,-60,3,3,['idle','wave'],ALL);crowd(11,45,3,3,['idle','photo'],ALL);crowd(-11,60,3,3,['wave','idle'],ALL);crowd(11,-30,3,3,['idle','watch'],ALL);crowd(0,28,4,4,['spark','idle'],KIDS);crowd(-30,10,3,2,['photo','idle'],ALL);crowd(30,10,3,2,['wave','watch'],ALL);
for(let i=0;i<(mobile?6:14);i++){const sx=pick([-1,1]),z1=R(-100,100),z0=z1+R(20,40);createPerson(pick(ALL),'walk',sx*10.5,z1,0,[[sx*10.5+R(-.5,.5),0,z1],[sx*10.5+R(-.5,.5),0,Math.min(100,z0)]])}

// ---------- fireworks ----------
const rockets=[],PADS=[[-50,-140],[0,-146],[50,-140],[-110,-125],[110,-125]],maxR=mobile?5:10;
const FWC=[0xff3b3b,0x3bff6a,0x3b8bff,0xb44bff,0xff8a1f,0xffd54a,0xff4bd0,0xffffff];
let snd=false,ac=null;
function boom(){if(!snd||!ac)return;const b=ac.createBuffer(1,ac.sampleRate*.8,ac.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,3);const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();f.type='lowpass';f.frequency.value=220;g.gain.value=.9;s.buffer=b;s.connect(f).connect(g).connect(ac.master);s.start()}
function launch(pad,x,y){if(rockets.length>=maxR)return;const p=pad||pick(PADS);rockets.push({p:V3(p[0],.5,p[1]),v:V3(R(-4,4),R(58,72),R(-3,3)),ty:y||R(70,115),c:C(pick(FWC)),k:Math.random()});for(let i=0;i<8;i++)sparks.spawn(p[0],.6,p[1],R(-3,3),R(3,9),R(-3,3),C(0xffc860),R(.4,.9))}
function burst(r){const n=mobile?60:130,type=r.k<.3?0:r.k<.55?1:r.k<.8?2:3,c2=C(pick(FWC));boom();flash.position.copy(r.p);flash.color.copy(r.c);flash.intensity=14000;
 for(let i=0;i<n;i++){let a=R(0,6.283),e=Math.acos(R(-1,1)),sp=R(14,28),dx=Math.sin(e)*Math.cos(a),dy=Math.cos(e),dz=Math.sin(e)*Math.sin(a),life=R(1.4,2.4),col=i%3==0&&type===3?c2:r.c;
  if(type===1){dy=Math.sin(a)*.3;dx=Math.cos(a);dz=Math.sin(a);sp=24}if(type===2){col=C(0xffd27a);life=R(2.4,3.4);sp*=.7}
  sparks.spawn(r.p.x,r.p.y,r.p.z,dx*sp,dy*sp,dz*sp,col,life)}
 for(let i=0;i<5;i++)smoke.spawn(r.p.x+R(-3,3),r.p.y+R(-3,3),r.p.z+R(-3,3),R(-1,1),R(0,1),R(-1,1),C(0x9a96b0),R(3,5))}
function fireShow(n=14){for(let i=0;i<n;i++)setTimeout(()=>launch(),i*260)}

// ---------- day/night + modes ----------
let day=0,dayT=0,celeb=0,celebT=0,hover=null,boostD=[];
const col={nTop:C(0x040822),nBot:C(0x4a2160),dTop:C(0x3f8fe0),dBot:C(0xcfe6ff),nFog:C(0x1a1240),dFog:C(0xbfd8f2),nAmb:C(0x4a5aa0),dAmb:C(0xffffff),nSun:C(0x8fa4ff),dSun:C(0xfff1d0)};
function applyDay(){skyU.top.value.lerpColors(col.nTop,col.dTop,day);skyU.bot.value.lerpColors(col.nBot,col.dBot,day);scene.fog.color.lerpColors(col.nFog,col.dFog,day);amb.color.lerpColors(col.nAmb,col.dAmb,day);amb.intensity=.6+day*.8;sun.color.lerpColors(col.nSun,col.dSun,day);sun.intensity=.75+day*1.5;
 const vis=1-day;stars.material.uniforms.g=stars.material.uniforms.g||{value:1};stars.visible=day<.7;moon.visible=halo.visible=day<.8;renderer.toneMappingExposure=1.05+day*.2}
// ---------- sound ----------
function sound(on){snd=on;if(on&&!ac){ac=new AudioContext();ac.master=ac.createGain();ac.master.gain.value=.15;ac.master.connect(ac.destination);[110,165,220].forEach((f,i)=>{const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;o.detune.value=i*7;g.gain.value=.22;o.connect(g).connect(ac.master);o.start()});
 setInterval(()=>{if(!snd)return;const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=pick([523,587,659,784,880,1047]);g.gain.setValueAtTime(.4,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+1.6);o.connect(g).connect(ac.master);o.start();o.stop(ac.currentTime+1.7)},1500)}
 if(ac)ac[on?'resume':'suspend']();$('#soundBtn').textContent=on?'🔊':'🔇'}

// ---------- camera tween + UI ----------
let fly=null;const flyTo=(p,t,d=2.8)=>{ctl.autoRotate=false;fly={p0:cam.position.clone(),t0:ctl.target.clone(),p1:p,t1:t,d,e:0}};
ctl.addEventListener('start',()=>{fly=null;ctl.autoRotate=false});
const hero=$('#hero'),dock=$('#dock');
function act(a){const m=ctl;if(a==='home'){hero.classList.remove('hide');dock.classList.remove('show');flyTo(HOME.p.clone(),HOME.t.clone());setTimeout(()=>ctl.autoRotate=true,3000)}
 if(a==='explore'){hero.classList.add('hide');dock.classList.add('show');flyTo(V3(0,34,88),V3(0,8,0))}
 if(a==='celebrate'){hero.classList.add('hide');dock.classList.add('show');setCel(true);fireShow(16);flyTo(V3(0,38,66),V3(0,40,-95),3.2)}
 if(a==='about')new bootstrap.Modal('#about').show()}
function setCel(v){celebT=v?1:0;$('#bCel').classList.toggle('on',v)}
document.querySelectorAll('[data-act]').forEach(e=>e.addEventListener('click',ev=>{ev.preventDefault();act(e.dataset.act);const nv=$('#nv');if(nv.classList.contains('show'))bootstrap.Collapse.getOrCreateInstance(nv).hide()}));
$('#bFire').onclick=()=>fireShow(14);$('#bCel').onclick=()=>setCel(!celebT);$('#bDay').onclick=()=>{dayT=dayT?0:1;$('#bDay').textContent=dayT?'☀️ Day / Night':'🌙 Day / Night'};
$('#bReset').onclick=()=>act('home');$('#soundBtn').onclick=()=>sound(!snd);
$('#fsBtn').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.();

// ---------- interaction ----------
const ray=new THREE.Raycaster(),mp=new THREE.Vector2(),tip=$('#tip');let down=null;
const clickD=[];for(let i=0;i<14;i++){const a=i/14*6.283,r=4.2+(i%2)*1.2,m=new THREE.Mesh(new THREE.SphereGeometry(.5,10,8),new THREE.MeshStandardMaterial({color:0xc4602a,emissive:0x602000}));m.scale.y=.6;m.position.set(Math.cos(a)*r,1.9+(r>5?0:0),10+Math.sin(a)*r);m.position.y=1.5;m.visible=true;const f=new THREE.Sprite(new THREE.SpriteMaterial({map:GT,color:0xffb347,blending:THREE.AdditiveBlending,depthWrite:false}));f.scale.setScalar(2);f.position.y=.9;m.add(f);m.userData={d:1,f,boost:0};scene.add(m);clickD.push(m)}
// hide the floating clickable diyas inside basin area? they sit on the fountain edge ring (y=1.5 above basin rim)
function cast(e){const r=renderer.domElement.getBoundingClientRect();mp.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mp,cam);return ray.intersectObjects([...clickD,...pickables,grass],false)}
renderer.domElement.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const h=cast(e)[0];hover=h&&h.object.userData.b?h.object:null;tip.style.opacity=hover?1:0;if(hover){tip.textContent='🏠 '+hover.userData.name;tip.style.left=e.clientX+'px';tip.style.top=e.clientY+'px'}});
renderer.domElement.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);
renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>6)return;const h=cast(e)[0];if(!h)return;const o=h.object;
 if(o.userData.d){o.userData.boost=1;for(let i=0;i<30;i++)sparks.spawn(o.position.x,o.position.y+.5,o.position.z,R(-4,4),R(3,9),R(-4,4),C(0xffd27a),R(.6,1.2))}
 else if(o.userData.b){const p=o.getWorldPosition(V3());o.userData.pulse=1;launch([p.x,p.z],0,R(50,80));tip.textContent='✨ '+o.userData.name+' — Shubh Deepavali!';tip.style.opacity=1;tip.style.left=e.clientX+'px';tip.style.top=e.clientY+'px';setTimeout(()=>{if(!hover)tip.style.opacity=0},1800)}
 else{for(let i=0;i<40;i++)sparks.spawn(h.point.x,h.point.y+.5,h.point.z,R(-5,5),R(4,11),R(-5,5),C(pick(FWC)),R(.7,1.4))}});

// ---------- loop ----------
const clock=new THREE.Clock(),tmp=V3();let acc=0,perf=[0,0],te=0;
function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);te+=dt;U.t.value=te;
 if(fly){fly.e+=dt;const k=Math.min(1,fly.e/fly.d),s=k*k*(3-2*k);cam.position.lerpVectors(fly.p0,fly.p1,s);ctl.target.lerpVectors(fly.t0,fly.t1,s);if(k>=1)fly=null}
 if(Math.abs(dayT-day)>.002){day+=(dayT-day)*Math.min(1,dt*2.2);applyDay()}celeb+=(celebT-celeb)*Math.min(1,dt*2);
 U.g.value=(1-day*.88)*(1+celeb*.3);bloom.strength=(.9+celeb*.5)*(1-day*.75);
 // auto fireworks
 acc+=dt;if(acc>(celebT?.35:2.2)*R(.6,1.4)&&day<.6){acc=0;launch()}
 for(let i=rockets.length-1;i>=0;i--){const r=rockets[i];r.p.addScaledVector(r.v,dt);r.v.y-=6*dt;sparks.spawn(r.p.x,r.p.y,r.p.z,R(-1,1),R(-3,0),R(-1,1),C(0xffc060),R(.5,.9));if(r.p.y>=r.ty||r.v.y<8){burst(r);rockets.splice(i,1)}}
 flash.intensity*=Math.pow(.02,dt);
 // people
 for(const p of people){const u=p.userData,t=te+u.ph;
  if(u.mode==='walk'){const tg=u.to?u.b:u.a;tmp.copy(tg).sub(p.position);tmp.y=0;if(tmp.length()<.5)u.to=!u.to;else{tmp.normalize();p.position.addScaledVector(tmp,1.3*dt);p.rotation.y=Math.atan2(tmp.x,tmp.z)}const s=Math.sin(t*6)*.6;u.legs.forEach((l,i)=>l.rotation.x=i?s:-s);u.arms[0].rotation.x=s*.7;u.arms[1].rotation.x=-s*.7}
  else if(u.mode==='spark'){u.arms[1].rotation.set(-2.1+Math.sin(t*3)*.25,0,-.2);u.arms[0].rotation.z=-.3;u.head.rotation.y=Math.sin(t*.8)*.5;p.position.y=.28+Math.abs(Math.sin(t*4))*.04}
  else if(u.mode==='wave'){u.arms[1].rotation.z=2.5+Math.sin(t*6)*.4;u.head.rotation.y=Math.sin(t)*.3}
  else if(u.mode==='watch'){u.head.rotation.x=-.5;u.arms[0].rotation.x=Math.sin(t)*.05;u.arms[1].rotation.x=Math.sin(t*1.2)*.05}
  else if(u.mode==='photo'){u.arms[0].rotation.x=u.arms[1].rotation.x=-1.5;u.head.rotation.y=Math.sin(t*.5)*.2}
  else{u.head.rotation.y=Math.sin(t*.7)*.5;u.arms[0].rotation.x=Math.sin(t*1.5)*.08}}
 for(const u of sparkers){u.tip.getWorldPosition(tmp);const f=R(.6,1.2);u.sp.material.opacity=f;u.sp.scale.setScalar(.6+f*.5);if(u.pl)u.pl.intensity=2+f*3;for(let i=0;i<4;i++){const a=R(0,6.283),s=R(2,6);sparks.spawn(tmp.x,tmp.y,tmp.z,Math.cos(a)*s,R(1,6),Math.sin(a)*s,Math.random()<.5?C(0xffffff):C(0xffc34a),R(.3,.8))}}
 // fountain
 for(let i=0;i<5;i++){const a=R(0,6.283),r=R(.4,1.6);spray.spawn(Math.cos(a)*.3,3.5,10+Math.sin(a)*.3,Math.cos(a)*r,R(7,10),Math.sin(a)*r,C(0x9fd8ff),R(1,1.5))}water.material.emissiveIntensity=.35+Math.sin(te*2)*.1;
 sparks.update(dt);smoke.update(dt);spray.update(dt);
 // hover / click diyas / building highlights
 bMats.forEach(m=>{const b=m.userData.base??(m.userData.base=.9);m.emissiveIntensity=(b*(1-day*.9))*(m===hover?.material?2.2:1)*(.9+.1*Math.sin(te*3+m.id))});
 for(const d of clickD){const k=d.userData;k.boost*=Math.pow(.2,dt);const f=1+k.boost*2+.15*Math.sin(te*9+d.id);k.f.scale.setScalar(2*f)}
 floaters.rotation.y=te*.01;floaters.position.y=Math.sin(te*.4)*1.5;
 stars.rotation.y=te*.004;
 ctl.update();composer.render();
 if(++perf[1]>=120){const avg=(te-perf[0])/120;perf=[te,0];if(avg>.036&&pr>1){pr=Math.max(1,pr-.5);renderer.setPixelRatio(pr);resize()}else if(avg>.045)bloom.enabled=false}}
function resize(){const w=innerWidth,h=innerHeight;cam.aspect=w/h;cam.updateProjectionMatrix();renderer.setPixelRatio(pr);renderer.setSize(w,h);composer.setPixelRatio(pr);composer.setSize(w,h)}
addEventListener('resize',resize);addEventListener('pagehide',()=>{renderer.dispose();composer.dispose()});
applyDay();animate();
})().catch(e=>{console.error(e);document.body.insertAdjacentHTML('beforeend','<pre style="position:fixed;top:70px;left:10px;color:#ffb;z-index:9">Failed to load 3D scene: '+e.message+'\nCheck your internet connection (Three.js loads from a CDN).</pre>')});
