import type { LoginProps, ProjectResponse, Schema } from './types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

export class AuthenticationError extends Error {
	constructor(msg: string) {
		super(msg);
	}
}

export class HeadersBuilder {
	protected _headers: Headers = new Headers();

	public clear(): HeadersBuilder {
		this._headers = new Headers();
		return this;
	}

	public base(): HeadersBuilder {
		this._headers.append('Content-Type', 'application/json');
		this._headers.append('Accept', 'application/json');
		return this;
	}

	public withToken(token: string): HeadersBuilder {
		this._headers.append('Authorization', `Bearer ${token}`);
		return this;
	}

	public headers(): Headers {
		return this._headers;
	}
}

export class BackendService {
	private static instance: BackendService;
	public static getInstance(): BackendService {
		if (!this.instance) this.instance = new BackendService();

		return this.instance;
	}
	private fetch: typeof fetch = fetch;

	public useFetcher(fetcher: typeof fetch): void {
		this.fetch = fetcher;
	}

	public async login(creds: LoginProps): Promise<string> {
		const headers = new HeadersBuilder().base().headers();
		const url = [PUBLIC_BACKEND_URL, 'api', 'auth', 'login'].join('/');
		const body = JSON.stringify(creds);

		const response = await this.fetch(url, {
			method: 'POST',
			headers,
			body
		});

		if (!response.ok || response.status >= 400) {
			throw new AuthenticationError(`Server rejected error. Status: ${response.status}.`);
		}

		const token = response.headers.get('X-Token');
		if (!token) {
			throw new AuthenticationError('Token is empty.');
		}
		return token;
	}

	public async validateToken(token: string): Promise<boolean> {
		const headers = new HeadersBuilder().base().withToken(token).headers();

		const url = [PUBLIC_BACKEND_URL, 'api', 'auth', 'validate'].join('/');

		const response = await this.fetch(url, {
			method: 'POST',
			headers
		});
		if (!response.ok || response.status >= 400) return false;

		return true;
	}

	public async getSchema<T extends string = string>(schema: string): Promise<Schema<T>> {
		const headers = new HeadersBuilder().base().headers();
		const url = [PUBLIC_BACKEND_URL, 'api', 'schema', schema].join('/');
		const response = await this.fetch(url, {
			method: 'GET',
			headers
		});

		const parsed = await response.json();

		return parsed as Schema<T>;
	}

	public async getProjects(token: string): Promise<ProjectResponse> {
		const headers = new HeadersBuilder().base().withToken(token).headers();
		const url = [PUBLIC_BACKEND_URL, 'api', 'projects'].join('/');

		const response = await this.fetch(url, {
			headers,
			method: 'GET'
		});

		const parsed = await response.json();
		return parsed as ProjectResponse;
	}
}
