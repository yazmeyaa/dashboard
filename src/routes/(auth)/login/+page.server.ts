import { BackendService } from '$lib/api';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	login: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (!username || !password) return redirect(300, '/login');
		if (typeof username !== 'string' || typeof password !== 'string')
			return redirect(300, '/login');

		const apiService = BackendService.getInstance();
		try {
			const token = await apiService.login({ username, password });
			cookies.set('auth', token, {
				secure: true,
				path: '/'
			});

			if (url.searchParams.has('redirectTo')) {
				redirect(303, url.searchParams.get('redirectTo')!);
			}
			return { success: true };
		} catch (error) {
			if (error instanceof Error) {
				return fail(400, {
					error: error.message
				});
			} else {
				return fail(400, {
					error: 'Unexpected error.'
				});
			}
		}
	}
} satisfies Actions;
