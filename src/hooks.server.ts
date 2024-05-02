import { env } from '$env/dynamic/private';
import { commonRoutes } from '$lib/utils/constants';
import { authCookieNames } from '$lib/utils/supertokens/cookieHelpers';
import { BlackApi } from '@api';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { AxiosError, AxiosResponse } from 'axios';
import SuperTokens from 'supertokens-web-js';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword';

const LOG_PREFIX = '[hooks.server.ts]';

/* -------------------- Super Tokens -------------------- */
SuperTokens.init({
	appInfo: {
		appName: 'MyTestApp',
		apiDomain: env.API_DOMAIN,
		apiBasePath: env.SUPERTOKENS_API_BASE_PATH || '/'
	},
	recipeList: [
		EmailPassword.init() // Initializes signin / signup features
	]
});

const publicPages = [
	commonRoutes.login,
	commonRoutes.resetPassword,
	commonRoutes.emailExists,
	commonRoutes.refreshSession,
	commonRoutes.logout
] as const;
export const handle = (async ({ event, resolve }) => {
	const basePath = `${env.API_DOMAIN}`;
	try {
		const frontToken = event.cookies.get(authCookieNames.front);
		const sAccessToken = event.cookies.get(authCookieNames.access) ?? "";
		const sRefreshToken = event.cookies.get(authCookieNames.refresh) ?? "";
		const antiCsrfToken = event.cookies.get(authCookieNames.csrf);
		
		const api = new BlackApi({ basePath });
		api.setCookies(sAccessToken, sRefreshToken, antiCsrfToken)

		event.locals.api = api;
		
		if (sAccessToken) {
			await api.authApi.isAuthenticated();
		}

		if (frontToken) {
			const { uid } = JSON.parse(decodeURIComponent(escape(atob(frontToken))));
			event.locals.user = {
				id: uid
			};
		} else {
			event.locals.user = {};
		}

		const res = await resolve(event);
		res.headers.delete('Link');
		return res;
	} catch (error) {
		if (error instanceof AxiosError && error.response?.status == 401) {
			if (!publicPages.includes(event.url.pathname as (typeof publicPages)[number])) {
				const { url } = event;
				const redirectUrl = `${commonRoutes.refreshSession}?returnUrl=${encodeURI(
					`${url.pathname}${url.search}`
				)}`;
				const headers = new Headers();
				headers.set('Location', redirectUrl);
				headers.set('st-auth-mode', 'cookie');
				return new Response(null, { status: 303, headers });
			}
		} else {
			throw error;
		}
		event.locals.user = {};
		const res = await resolve(event);
		res.headers.delete('Link');
		return res;
	}
}) satisfies Handle;

const DEFAULT_MESSAGE = 'Hmm, not sure about that. Check the logs or open a ticket?';

const parseError = (error: unknown) => {
	const httpError = error as AxiosError;
	const request = httpError?.request as Request & { path: string };
	const response = httpError?.response as AxiosResponse<{
		message: string;
		statusCode: number;
		error: string;
	}>;

	let code = response?.data?.statusCode || response?.status || httpError.code || '500';
	if (response) {
		code += ` - ${response.data?.error || response.statusText}`;
	}

	if (request && response) {
		console.log({
			status: response.status,
			url: `${request.method} ${request.path}`,
			response: response.data || 'No data'
		});
	}

	return {
		message: response?.data?.message || httpError?.message || DEFAULT_MESSAGE,
		code,
		stack: httpError?.stack
	};
};

export const handleError: HandleServerError = ({ error }) => {
	const result = parseError(error);
	console.log(error);
	console.error(`${LOG_PREFIX}:handleError ${result.message}`);
	return result;
};
