import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.pdf':'application/pdf','.json':'application/json','.xml':'application/xml'};
if(process.argv[2])process.env.PORT=process.argv[2];
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');let target=decodeURIComponent(url.pathname);if(target.endsWith('/'))target+='index.html';const file=path.resolve(root,'.'+target);if(!file.startsWith(root+path.sep)||target.split('/').some(x=>x.startsWith('.'))){res.writeHead(403);res.end();return;}const body=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);}catch{res.writeHead(404);res.end('Not found');}}).listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${process.env.PORT||4173}`));
