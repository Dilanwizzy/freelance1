import type { RequestHandler } from './$types';
import SuperTokensHelpers from '$lib/utils/supertokens';
import { authCookieNames, createCookieSettings, createHeadersFromTokens } from '$lib/utils/supertokens/cookieHelpers';
import { commonRoutes } from '$lib/utils/constants';

export const GET = (async ({ cookies, url, locals }) => {
	const refreshToken = cookies.get(authCookieNames.refresh) ?? "";
	const antiCsrfToken = cookies.get(authCookieNames.csrf);
	const accessToken = cookies.get(authCookieNames.access) as string;

	locals.api.setCookies(accessToken, refreshToken, antiCsrfToken);

	const newTokens = await SuperTokensHelpers.refreshToken({ refreshToken, accessToken, antiCsrfToken });
	if (newTokens.frontToken && newTokens.frontToken == 'remove') {
		const headers = new Headers();
		headers.set('Location', commonRoutes.logout);
		return new Response(null, {status: 303, headers});
	}
	const headers = createHeadersFromTokens(newTokens);
	headers.set(
		'Location',
		newTokens.accessToken ? url.searchParams.get('returnUrl') || '/' : commonRoutes.login
	);
	headers.set('st-auth-mode', 'cookie');

	const cookieSettings = createCookieSettings();
	const refreshCookieSettings = createCookieSettings('refresh');

	if (newTokens.accessToken) cookies.set(authCookieNames.access, newTokens.accessToken, cookieSettings);
	if (newTokens.frontToken) cookies.set(authCookieNames.front, newTokens.frontToken, cookieSettings);
	if (newTokens.refreshToken) cookies.set(authCookieNames.refresh, newTokens.refreshToken as string, refreshCookieSettings);
	if (newTokens.antiCsrfToken) cookies.set(authCookieNames.csrf, newTokens.antiCsrfToken, cookieSettings)
	
	return new Response(null, { status: 307, headers: headers });
}) satisfies RequestHandler;

export const POST = GET;
