import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import UnoCSS from 'unocss/vite';
import { imagetools } from 'vite-imagetools';
export default defineConfig({
	plugins: [sveltekit(), UnoCSS(), imagetools()],
	ssr: {
		noExternal: ['@xstate/svelte']
	}
});
