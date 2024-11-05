import { BackendService } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, data }) => {
	const apiService = BackendService.getInstance();
	apiService.useFetcher(fetch);
	const schema = await apiService.getSchema('project');
	const projects = await apiService.getProjects(data.token!);
	return { schema, projects, token: data.token };
};
