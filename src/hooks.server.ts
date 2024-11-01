import { BackendService } from '$lib/api';
import { type Handle } from '@sveltejs/kit';

function redirectTo(to: '/login' | '/', from?: string): Response {
	const redirectUrl = from ? `${to}?redirectTo=${from}` : to;
	return new Response('Redirect', {
		status: 303,
		headers: {
			location: redirectUrl
		}
	});
}

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('auth');
	const { pathname } = event.url;
	const apiService = BackendService.getInstance();
	apiService.useFetcher(event.fetch);

	// Handle public routes
	if (pathname.startsWith('/login')) {
		if (!token) {
			const response = await resolve(event);
			return response;
		}

		const validateResult = await apiService.validateToken(token);
		if (validateResult) {
			return redirectTo('/');
		} else {
			event.cookies.delete('auth', {
				path: '/'
			});
			return redirectTo('/login');
		}
	}

	if (!token) return redirectTo('/login', event.url.pathname);
	const validateResult = await apiService.validateToken(token);

	if (!validateResult) {
		event.cookies.delete('auth', {
			path: '/'
		});
		return redirectTo('/login', event.url.pathname);
	}

	event.locals.token = token;
	const response = await resolve(event);
	return response;
};
