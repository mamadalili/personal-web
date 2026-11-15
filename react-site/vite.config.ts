import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import { publicMiddleware } from '../scripts/public-preview.mjs';

export default defineConfig({
  publicDir: 'static',
  plugins: [{name:'shared-public-files',configureServer(server){
    const serve=publicMiddleware({react:true});
    server.middlewares.use((req,res,next)=>req.url?.startsWith('/@')||req.url?.startsWith('/node_modules/')?next():serve(req,res,next));
  }}, reactRouter()]
});
