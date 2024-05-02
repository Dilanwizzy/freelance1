import {
	UserApi,
	BusinessApi,
	AuthApi,
	AddressApi,
	SearchApi,
	type ConfigurationParameters,
	Configuration,
	ListingApi
} from './open-api';
import { BASE_PATH } from './open-api/base';
import { DUMMY_BASE_URL, toPathString } from './open-api/common';

export class BlackApi {
	public userApi: UserApi;
	public businessApi: BusinessApi;
	public listingApi: ListingApi;
	public addressApi: AddressApi;
	public authApi: AuthApi;
	public searchApi: SearchApi;

	private config: Configuration;
	private key?: string;

	get isSharedLink() {
		return !!this.key;
	}

	constructor(params: ConfigurationParameters) {
		this.config = new Configuration(params);
		this.setBaseHeaders();

		this.userApi = new UserApi(this.config);
		this.businessApi = new BusinessApi(this.config);
		this.listingApi = new ListingApi(this.config);
		this.addressApi = new AddressApi(this.config);
		this.authApi = new AuthApi(this.config);
		this.searchApi = new SearchApi(this.config);
	}

	private createUrl(path: string, params?: Record<string, unknown>) {
		const searchParams = new URLSearchParams();
		for (const key in params) {
			const value = params[key];
			if (value !== undefined && value !== null) {
				searchParams.set(key, value.toString());
			}
		}

		const url = new URL(path, DUMMY_BASE_URL);
		url.search = searchParams.toString();

		return (this.config.basePath || BASE_PATH) + toPathString(url);
	}

	public setKey(key: string) {
		this.key = key;
	}

	public getKey(): string | undefined {
		return this.key;
	}

	public setAccessToken(accessToken: string) {
		this.config.accessToken = accessToken;
	}

	public removeAccessToken() {
		this.config.accessToken = undefined;
	}

	public setBaseUrl(baseUrl: string) {
		this.config.basePath = baseUrl;
	}

	public setCookies(access: string, refresh: string, antiCsr?: string) {
		this.config.baseOptions = {
			headers: {
				cookie: `sAccessToken=${access};sRefreshToken=${refresh};${antiCsr ? 'anti-csrf:' + antiCsr : ''}`,
				'rid':'anti-csrf',
				'st-auth-mode': 'cookie'
			}
		};
	}

	public setBaseHeaders() {
		this.config.baseOptions = {
			credentials: 'include',
			headers: {
				'rid': 'anti-csrf',
				'st-auth-mode': 'cookie'
			}
		}
	}
}

export const api = new BlackApi({ basePath: '/api' });
