import EmailPassword from 'supertokens-web-js/recipe/emailpassword';
import { authCookieNames, type Tokens } from './cookieHelpers';
import { AxiosError } from 'axios';
import { env } from '$env/dynamic/private';
// import Session from 'supertokens-web-js/recipe/session';
// import { env } from '$env/dynamic/private';
// import { commonRoutes } from '$lib/utils/constants';
// import type { Tokens } from '$lib/utils/supertokens/cookieHelpers';

type AuthDetails = { tokens: Tokens; message: string | undefined };

type SignInResult =
	| ({ status: 'WRONG_CREDENTIALS_ERROR' } & { [K in keyof AuthDetails]?: undefined })
	| ({ status: 'FIELD_ERROR' } & { [K in keyof AuthDetails]?: undefined })
	| ({ status: 'SIGN_IN_NOT_ALLOWED' } & { [K in keyof AuthDetails]?: undefined })
	| ({ status: 'GENERAL_ERROR' } & { [K in keyof AuthDetails]?: undefined })
	| ({ status: 'OK' } & AuthDetails);

type SignUpResult =
	| ({ status: 'FIELD_ERROR' } & { [K in keyof AuthDetails]?: undefined })
	| ({ status: 'SIGN_UP_NOT_ALLOWED' } & { [K in keyof AuthDetails]?: undefined })
	| ({ status: 'GENERAL_ERROR' } & { [K in keyof AuthDetails]?: undefined })
	| ({ status: 'OK' } & AuthDetails);

type TokensForLogout = Pick<Tokens, 'accessToken' | 'antiCsrfToken' | 'frontToken'>;
type TokensForRefresh = { refreshToken: string; accessToken: string; antiCsrfToken?: string };
// type ResetPasswordStatus = Awaited<
// 	ReturnType<(typeof EmailPassword)['resetPasswordUsingToken']>
// >['status'];
// const recipeId = 'emailpassword';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapKeys = ({
	'front-token': frontToken,
	'st-access-token': accessToken,
	'st-refresh-token': refreshToken,
	'anti-csrf': antiCsrfToken
}: any): Tokens => ({
	frontToken,
	accessToken,
	refreshToken,
	antiCsrfToken
});

const mapCookies = ({ sAccessToken: frontToken, sRefreshToken: accessToken }: any): Tokens => ({
	frontToken,
	accessToken,
	refreshToken,
	antiCsrfToken
});

const SuperTokensHelpers = {
	async signin(username: string, email: string, password: string): Promise<SignInResult> {
		console.log('Signin')
		try {
			const signInResult = await EmailPassword.signIn({
				formFields: [
					{ id: 'email', value: email != undefined ? email : username },
					{ id: 'password', value: password }
				]
			});
			if (
				signInResult.status === 'WRONG_CREDENTIALS_ERROR' ||
				signInResult.status === 'FIELD_ERROR' ||
				signInResult.status === 'SIGN_IN_NOT_ALLOWED'
			)
				return { status: signInResult.status };

			const { status } = signInResult;

			const headersObject = Object.fromEntries(signInResult.fetchResponse.headers);
			const tokens = mapKeys(headersObject);
			return { status, tokens: tokens, message: undefined };
		} catch (err) {
			if (err && err.isSuperTokensGeneralError) {
				return { status: 'GENERAL_ERROR', message: err.message };
			}

			throw err;
		}
	},

	async signup(username: string, email: string, password: string): Promise<SignUpResult> {
		try {
			const signUpResult = await EmailPassword.signUp({
				formFields: [
					{ id: 'email', value: username },
					{ id: 'actualEmail', value: email },
					{ id: 'password', value: password }
				]
			});
			
			if (signUpResult.status === 'FIELD_ERROR' || signUpResult.status === 'SIGN_UP_NOT_ALLOWED')
				return { status: signUpResult.status };

			const { status } = signUpResult;

			const headersObject = Object.fromEntries(signUpResult.fetchResponse.headers);
			const tokens = mapKeys(headersObject);
			return { status, tokens: tokens, message: undefined };
		} catch (err) {
			if (err && err.isSuperTokensGeneralError) {
				return { status: 'GENERAL_ERROR', message: err.message };
			}

			throw err;
		}
	},

	async refreshToken({
		refreshToken,
		accessToken,
		antiCsrfToken
	}: TokensForRefresh): Promise<Partial<Tokens>> {
		try {
			const response = await fetch(
				`${env.API_DOMAIN}${env.SUPERTOKENS_API_BASE_PATH}session/refresh`,
				{
					method: 'POST',
					body: '',
					headers: {
						rid: 'session',
						cookie: `${authCookieNames.access}=${accessToken};${authCookieNames.csrf}=${antiCsrfToken};${authCookieNames.refresh}=${refreshToken}`
					}
				}
			);

			const headersObject = Object.fromEntries(response.headers);
			const tokens = mapKeys(headersObject);

			const cookieTokens = response.headers.getSetCookie().map((cookie) => {
				const splitCookie = cookie.split(';');
				const [key, value] = splitCookie[0].trim().split('=');

				return {
					[key]: value
				};
			});

			cookieTokens.forEach((token) => {
				if (token.sAccessToken) {
					tokens.accessToken = token.sAccessToken;
				}
				if (token.sRefreshToken) {
					tokens.refreshToken = token.sRefreshToken;
				}
			});

			return tokens;
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.status === 401) {
					return {};
				}

				throw new Error('Internal Server Error');
			}

			return {};
		}
	}

	// 	// NOTE: Fails silently for unknown emails intentionally
	// 	async sendPasswordResetEmail(userId: string, email: string): Promise<void> {
	// 		const tokenResult = await EmailPassword.createResetPasswordToken('public', userId, email);
	// 		if (tokenResult.status === 'UNKNOWN_USER_ID_ERROR') {
	// 			return console.log(`Password reset email not sent, unknown user id: ${userId}`);
	// 		}

	// 		const passwordResetPath = commonRoutes.resetPassword;
	// 		const passwordResetLink = `${env.DOMAIN}${passwordResetPath}?token=${tokenResult.token}&rid=${recipeId}`;
	// 		await EmailPassword.sendEmail({
	// 			type: 'PASSWORD_RESET',
	// 			user: {
	// 				id: userId,
	// 				recipeUserId: undefined,
	// 				email: email
	// 			},
	// 			passwordResetLink: passwordResetLink,
	// 			tenantId: 'public'
	// 		});
	// 	},

	// 	async resetPassword(token: string, newPassword: string): Promise<ResetPasswordStatus> {
	// 		const { status } = await EmailPassword.resetPasswordUsingToken('public', token, newPassword);
	// 		return status;
	// 	}
};

export default SuperTokensHelpers;
