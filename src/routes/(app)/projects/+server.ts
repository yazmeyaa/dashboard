import { type RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ request }) => {
	const body = await request.json();

	if ('id' in body === false)
		return new Response('Wrong!', {
			status: 400
		});

	return new Response('Hello world!');
};
