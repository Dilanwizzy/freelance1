import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "0 0 0",
		"--on-success": "255 255 255",
		"--on-warning": "0 0 0",
		"--on-error": "0 0 0",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #3C9016 
		"--color-primary-50": "226 238 220", // #e2eedc
		"--color-primary-100": "216 233 208", // #d8e9d0
		"--color-primary-200": "206 227 197", // #cee3c5
		"--color-primary-300": "177 211 162", // #b1d3a2
		"--color-primary-400": "119 177 92", // #77b15c
		"--color-primary-500": "60 144 22", // #3C9016
		"--color-primary-600": "54 130 20", // #368214
		"--color-primary-700": "45 108 17", // #2d6c11
		"--color-primary-800": "36 86 13", // #24560d
		"--color-primary-900": "29 71 11", // #1d470b
		// secondary | #E61A1A 
		"--color-secondary-50": "251 221 221", // #fbdddd
		"--color-secondary-100": "250 209 209", // #fad1d1
		"--color-secondary-200": "249 198 198", // #f9c6c6
		"--color-secondary-300": "245 163 163", // #f5a3a3
		"--color-secondary-400": "238 95 95", // #ee5f5f
		"--color-secondary-500": "230 26 26", // #E61A1A
		"--color-secondary-600": "207 23 23", // #cf1717
		"--color-secondary-700": "173 20 20", // #ad1414
		"--color-secondary-800": "138 16 16", // #8a1010
		"--color-secondary-900": "113 13 13", // #710d0d
		// tertiary | #EC7A00 
		"--color-tertiary-50": "252 235 217", // #fcebd9
		"--color-tertiary-100": "251 228 204", // #fbe4cc
		"--color-tertiary-200": "250 222 191", // #fadebf
		"--color-tertiary-300": "247 202 153", // #f7ca99
		"--color-tertiary-400": "242 162 77", // #f2a24d
		"--color-tertiary-500": "236 122 0", // #EC7A00
		"--color-tertiary-600": "212 110 0", // #d46e00
		"--color-tertiary-700": "177 92 0", // #b15c00
		"--color-tertiary-800": "142 73 0", // #8e4900
		"--color-tertiary-900": "116 60 0", // #743c00
		// success | #3C9016 
		"--color-success-50": "226 238 220", // #e2eedc
		"--color-success-100": "216 233 208", // #d8e9d0
		"--color-success-200": "206 227 197", // #cee3c5
		"--color-success-300": "177 211 162", // #b1d3a2
		"--color-success-400": "119 177 92", // #77b15c
		"--color-success-500": "60 144 22", // #3C9016
		"--color-success-600": "54 130 20", // #368214
		"--color-success-700": "45 108 17", // #2d6c11
		"--color-success-800": "36 86 13", // #24560d
		"--color-success-900": "29 71 11", // #1d470b
		// warning | #EAB308 
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #E61A1A 
		"--color-error-50": "251 221 221", // #fbdddd
		"--color-error-100": "250 209 209", // #fad1d1
		"--color-error-200": "249 198 198", // #f9c6c6
		"--color-error-300": "245 163 163", // #f5a3a3
		"--color-error-400": "238 95 95", // #ee5f5f
		"--color-error-500": "230 26 26", // #E61A1A
		"--color-error-600": "207 23 23", // #cf1717
		"--color-error-700": "173 20 20", // #ad1414
		"--color-error-800": "138 16 16", // #8a1010
		"--color-error-900": "113 13 13", // #710d0d
		// surface | #17191c 
		"--color-surface-50": "220 221 221", // #dcdddd
		"--color-surface-100": "209 209 210", // #d1d1d2
		"--color-surface-200": "197 198 198", // #c5c6c6
		"--color-surface-300": "162 163 164", // #a2a3a4
		"--color-surface-400": "93 94 96", // #5d5e60
		"--color-surface-500": "23 25 28", // #17191c
		"--color-surface-600": "21 23 25", // #151719
		"--color-surface-700": "17 19 21", // #111315
		"--color-surface-800": "14 15 17", // #0e0f11
		"--color-surface-900": "11 12 14", // #0b0c0e
		
	}
}