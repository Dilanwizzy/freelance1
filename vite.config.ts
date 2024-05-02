import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			'@api': path.resolve('./src/api')
		}
	},
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte'
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
