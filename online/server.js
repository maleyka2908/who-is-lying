const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const PORT = Number(process.env.PORT || 3000);
const rooms = new Map();
const uid = () => crypto.randomBytes(16).toString('hex');
const code = () => crypto.randomBytes(3).toString('hex').toUpperCase();
const clean = s => String(s || '').trim().replace(/[<>]/g, '').slice(0, 22);
function send(res, status, obj) { res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}); res.end(JSON.stringify(obj)); }
function findPlayer(room, token) { return room.players.find(p => p.token === token); }
function snapshot(room, player) {
 return {code:room.code, phase:room.phase, round:room.round, host:room.host===player.id, me:player.id,
 players:room.players.map(p=>({id:p.id,name:p.name,connected:p.connected,score:p.score, voted:!!room.votes[p.id]})),
 role: room.phase==='lobby' ? null : (player.id===room.liar ? 'LIAR':'DETECTIVE'),
 word: room.phase==='lobby' ? null : (player.id===room.liar ? null : room.word),
 votesCast:Object.keys(room.votes).length, result:room.phase==='result'?room.result:null};
}
function broadcast(room) { for (const p of room.players) { const msg = `data: ${JSON.stringify(snapshot(room,p))}\n\n`; for(const res of p.streams) {try {res.write(msg)}catch{p.streams.delete(res)}} } }
function err(msg){const e=new Error(msg);e.status=400;throw e;}
const words=['Museum','Volcano','Library','Airport','Chocolate','Submarine','Pyramid','Aquarium','Camping','Spaceship','Waterfall','Cinema','Detective','Robot','Hospital','Snowman','Restaurant','Circus','Island','Elevator'];
function start(room) { if(room.players.length<3)err('At least 3 players are required.'); room.round++; room.phase='playing';room.votes={};room.result=null;room.word=words[crypto.randomInt(words.length)];room.liar=room.players[crypto.randomInt(room.players.length)].id; broadcast(room); }
function action(body) {
 const a=body.action;
 if(a==='create') {const name=clean(body.name);if(!name)err('Enter your name.');let c;do{c=code()}while(rooms.has(c));const p={id:uid(),token:uid(),name,score:0,connected:true,streams:new Set()};const r={code:c,host:p.id,players:[p],phase:'lobby',round:0,votes:{},result:null,lastActive:Date.now()};rooms.set(c,r);return {code:c,token:p.token};}
 const c=String(body.code||'').toUpperCase().trim(),r=rooms.get(c);if(!r)err('Room not found. Check the code.');r.lastActive=Date.now();
 if(a==='join'){if(r.phase!=='lobby')err('Game already started. Join next round.');if(r.players.length>=12)err('Room is full (12 players).');const name=clean(body.name);if(!name)err('Enter your name.');if(r.players.some(p=>p.name.toLowerCase()===name.toLowerCase()))err('That name is taken in this room.');const p={id:uid(),token:uid(),name,score:0,connected:true,streams:new Set()};r.players.push(p);broadcast(r);return {code:c,token:p.token};}
 const p=findPlayer(r,body.token);if(!p)err('Session not found. Rejoin the room.');
 if(a==='state')return snapshot(r,p);
 if(a==='start'){if(r.host!==p.id)err('Only host can start.');if(!['lobby','result'].includes(r.phase))err('Game already running.');start(r);return {ok:true};}
 if(a==='vote'){if(r.phase!=='playing')err('Voting is closed.');if(r.votes[p.id])err('You already voted.');if(!r.players.some(x=>x.id===body.target))err('Invalid vote.');if(body.target===p.id)err('You cannot vote for yourself.');r.votes[p.id]=body.target;
 if(Object.keys(r.votes).length===r.players.length){const counts={};for(const id of Object.values(r.votes))counts[id]=(counts[id]||0)+1;const max=Math.max(...Object.values(counts));const leaders=Object.keys(counts).filter(id=>counts[id]===max);const accused=leaders.length===1?leaders[0]:null;const caught=accused===r.liar;if(caught){for(const x of r.players)if(x.id!==r.liar)x.score+=2;}else{findPlayer(r,r.players.find(x=>x.id===r.liar).token).score+=3;}r.result={liar:r.liar,word:r.word,accused,caught,tie:leaders.length!==1,counts};r.phase='result';}
 broadcast(r);return {ok:true};}
 if(a==='reset'){if(r.host!==p.id)err('Only host can continue.');if(r.phase!=='result')err('Finish this round first.');r.phase='lobby';r.votes={};r.result=null;broadcast(r);return {ok:true};}
 if(a==='leave'){for(const s of p.streams){try{s.end()}catch{}}r.players=r.players.filter(x=>x.id!==p.id);if(!r.players.length){rooms.delete(c);return {ok:true}}if(r.host===p.id)r.host=r.players[0].id;if(r.phase==='playing'){r.phase='lobby';r.votes={};r.result=null;}broadcast(r);return {ok:true};}
 err('Unknown action.');
}
const server=http.createServer(async(req,res)=>{
 const u=new URL(req.url,'http://localhost');
 if(req.method==='POST'&&u.pathname==='/api'){
 let body='';try{for await(const chunk of req){body+=chunk;if(body.length>12000)throw Error('Too large');}send(res,200,action(JSON.parse(body)));}catch(e){send(res,e.status||400,{error:e.message||'Request failed'});}return;
 }
 if(req.method==='GET'&&u.pathname==='/events'){
 const r=rooms.get(String(u.searchParams.get('code')||'').toUpperCase());const p=r&&findPlayer(r,u.searchParams.get('token'));if(!p){send(res,404,{error:'Session expired'});return;}
 res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache, no-transform','Connection':'keep-alive','X-Accel-Buffering':'no'});p.streams.add(res);p.connected=true;r.lastActive=Date.now();res.write(`data: ${JSON.stringify(snapshot(r,p))}\n\n`);broadcast(r);
 const heartbeat=setInterval(()=>{try{res.write(': heartbeat\n\n')}catch{}},20000);
 req.on('close',()=>{clearInterval(heartbeat);p.streams.delete(res);p.connected=p.streams.size>0;broadcast(r);});return;
 }
 if(req.method!=='GET'){send(res,405,{error:'Method not allowed'});return;}
 const files={'/':'index.html','/index.html':'index.html','/style.css':'style.css','/app.js':'app.js'};
 const file=files[u.pathname];if(!file){res.writeHead(404);res.end('Not found');return;}
 const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8'};
 fs.readFile(path.join(__dirname,'public',file),(e,data)=>{if(e){res.writeHead(500);res.end('Server error');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]});res.end(data);});
});
setInterval(()=>{for(const [c,r] of rooms)if(Date.now()-r.lastActive>12*60*60*1000)rooms.delete(c)},60*60*1000).unref();
server.listen(PORT,'0.0.0.0',()=>console.log(`Who Is Lying? running at http://localhost:${PORT}`));
