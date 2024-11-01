import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const serverUrl = process.env.PUBLIC_BACKEND_URL;

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: serverUrl ?? 'http://localhost:3000/api',
				rewrite: (path) => path.replace(/^\/api/, ''),
				changeOrigin: true
			}
		}
	}
});
