// @ts-check
import { join } from 'path';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';
import { myCustomTheme } from './custom-theme.config';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./components/**/*.{html,js}',
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	darkMode: 'class',
	theme: {
		extend:{},
		container: {
			margin: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			}
		},
		aspectRatio: {
            none: 0,
            square: [1, 1],
            "16/9": [16, 9],
            "4/3": [4, 3],
            "21/9": [21, 9]
		}
	},
	variants: {
        aspectRatio: ['responsive']
	},
	plugins: [
		skeleton({
			themes: {
				custom: [myCustomTheme],
				// preset: ['skeleton']
			},
		}),
		require('tailwind-scrollbar-hide'),
		require("tailwindcss-responsive-embed"),
        require("tailwindcss-aspect-ratio"),
	],
}
