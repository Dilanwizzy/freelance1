import { type Actions, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { validateEmail, validatePassword, validateUsername } from '$lib/utils/validation';
import SuperTokensHelpers from '$lib/utils/supertokens';
import { authCookieNames, createCookieSettings } from '$lib/utils/supertokens/cookieHelpers';

export const load = (({ locals, url }) => {
	if (locals.user.id) redirect(303, '/');
	const loginMode = url.searchParams.get('mode');
	const mode = loginMode === 'signup' ? 'signup' : 'signin';
	return { mode };
}) satisfies PageServerLoad;

type ActionData = {
	banner?: string | null;
	username?: string | null;
	email?: string | null;
	password?: string | null;
};

export const actions: Actions = {
	async default(event) {
		if (event.locals.user.id) redirect(303, '/');

		const formData = await event.request.formData().then(Object.fromEntries);
		const { username, email, password, mode } = formData;

		const errors: ActionData = {};

		if (!username) errors.username = 'Username is required';
		else if (username.length < 4 || username.length > 32)
			errors.username = 'Username must be between 4-32 characters';
		else if (!validateUsername(username))
			errors.username = 'Username must contain only alphanumeric, underscore or hyphen characters.';

		if (mode === 'signup' && !email) errors.email = 'Email is required';
		else if (mode === 'signup' && !validateEmail(email)) errors.email = 'Email is invalid';

		if (!password) errors.password = 'Password is required';
		else if (mode === 'signup' && !validatePassword(password)) {
			errors.password = 'Password must contain at least 8 characters, including a number';
		}

		if (errors.email || errors.password || errors.username) return fail(400, { errors });

		// Attempt Sign In / Sign Up
		const normalizedMode = mode === 'signup' ? 'signup' : 'signin';
		const { status, tokens, message } = await SuperTokensHelpers[normalizedMode](
			username,
			email,
			password
		);

		// Auth failed
		if (status === 'WRONG_CREDENTIALS_ERROR') {
			return fail(401, {
				errors: { banner: 'Incorrect email and password combination' } as ActionData
			});
		}

		if (status === 'GENERAL_ERROR') {
			return fail(400, {
				errors: { banner: message } as ActionData
			});
		}

		if (status === 'FIELD_ERROR') {
			return fail(400, {
				errors: { email: 'This email already exists. Please sign in instead.' } as ActionData
			});
		}

		if (status === 'SIGN_IN_NOT_ALLOWED' || status === 'SIGN_UP_NOT_ALLOWED') {
			return fail(400, {
				errors: { email: 'This email already exists. Please sign in instead.' } as ActionData
			});
		}

		const cookieSettings = createCookieSettings();
		const refreshCookieSettings = createCookieSettings('refresh');

		event.cookies.set(authCookieNames.access, tokens.accessToken, cookieSettings);
		event.cookies.set(
			authCookieNames.refresh,
			tokens.refreshToken as string,
			refreshCookieSettings
		);
		event.cookies.set(authCookieNames.front, tokens.frontToken, cookieSettings);
		if (tokens.antiCsrfToken)
			event.cookies.set(authCookieNames.csrf, tokens.antiCsrfToken, cookieSettings);
		redirect(303, new URL(event.request.url).searchParams.get('returnUrl') || '/');
	}
};
