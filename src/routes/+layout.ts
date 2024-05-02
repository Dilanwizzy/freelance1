/* --- LOGIC --- */
// Chamges language slug in the url:
/** @typedef { import('$translation/i18n-types').Locales } Locales } */

/** @type { import('./$types').LayoutLoad<{ locale: Locales }> } */
export const load = async ({ url, params }) => {
	// fallback needed because of https://github.com/sveltejs/kit/issues/3647
	// let fallback = url.pathname.split('/')[1]; // en/search
	// const lang = /** @type { Locales } */ params.lang || fallback; // params.lang || url.pathname.split('/')[2]);

	// // redirect to base locale if language is not present
	// if (!locales.includes(lang)) {
	// 	throw redirect(302, replaceLocaleInUrl(url.pathname, baseLocale));
	// }

	// await loadLocaleAsync(lang);

	// return { locale: lang, pathname: url.pathname };

	console.log('HELLO TEST')
};
