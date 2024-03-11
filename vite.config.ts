import { wasm } from '@rollup/plugin-wasm';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [wasm(), sveltekit()]
});
