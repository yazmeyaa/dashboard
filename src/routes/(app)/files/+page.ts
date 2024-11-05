import { BackendService } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, data }) => {
	const apiService = BackendService.getInstance();
	apiService.useFetcher(fetch);
	const schema = await apiService.getSchema('staticFile');
	const files = await apiService.getFiles(data.token!);
	return { schema, token: data.token, files };
};
