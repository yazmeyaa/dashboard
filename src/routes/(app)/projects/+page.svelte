<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { clickOutside } from '$lib/actions/click-outside';
	import type { Project } from '$lib/api/types';
	import Input from '$lib/components/Input/Input.svelte';
	import TextTruncate from '$lib/components/TextTruncate/TextTruncate.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const columns = Object.keys(data.schema);

	let showSidebar = $state(false);
	let selectedProject = $state<Project | null>(null);
	let projectDraft = $state<Project | null>(null);
	const affected = $derived.by(() => {
		if (!selectedProject || !projectDraft) return false;
		for (const key in selectedProject) {
			if (selectedProject[key as keyof Project] !== projectDraft[key as keyof Project]) {
				return true;
			}
		}
		return false;
	});

	function onTableRowClick(event: Event, project: Project): void {
		event.stopPropagation();
		event.preventDefault();
		openSidebar(project);
	}

	function handleOutsideClick() {
		closeSidebar();
	}

	async function save() {
		if (!projectDraft) return;
		const response = await fetch(`/api/projects/${projectDraft.id}`, {
			method: 'PATCH',
			body: JSON.stringify(projectDraft),
			headers: {
				Authorization: `Bearer ${data.token}`
			}
		});

		const txt = await response.text();
		await invalidateAll();
		closeSidebar();
	}

	function openSidebar(project: Project): void {
		selectedProject = project;
		projectDraft = { ...selectedProject };
		showSidebar = true;
	}

	function closeSidebar(): void {
		selectedProject = null;
		projectDraft = null;
		showSidebar = false;
	}
</script>

<div class="relative w-full overflow-x-auto">
	<table class="mx-4 my-2 w-full border-collapse border-2 border-neutral-600 bg-neutral-600">
		<thead>
			<tr>
				{#each columns as column}
					<th class="border border-gray-300 px-4 py-2 text-left">{column}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data.projects as project}
				<tr
					onclick={(e) => onTableRowClick(e, project)}
					class="cursor-pointer border border-neutral-800 transition-colors hover:bg-neutral-400"
				>
					{#each columns as colKey}
						<td class="text-nowrap border border-gray-300 px-4 py-2">
							<TextTruncate text={project[colKey as keyof Project]} />
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

{#if showSidebar}
	<div class="absolute left-0 top-0 h-screen w-screen bg-[rgba(0,0,0,0.2)] backdrop-blur-sm">
		<div class="relative h-full w-full">
			<aside
				use:clickOutside={null}
				onoutsideclick={handleOutsideClick}
				class="absolute right-0 top-0 flex h-full min-w-96 max-w-3xl flex-col overflow-y-auto bg-neutral-500 px-2 py-4"
			>
				<header>
					<h2 class="text-xl">{selectedProject?.name ?? 'Проект не выбран...'}</h2>
				</header>
				<main class="flex-1">
					{#if !selectedProject || !projectDraft}
						<h1>Похоже, что проект не выбран.</h1>
						<button onclick={closeSidebar}>Закрыть панель.</button>
					{:else}
						<div class="flex flex-col gap-4">
							{#each Object.keys(selectedProject) as key}
								{@const id = `proj_${selectedProject.id}_input_${key}`}
								<Input
									label={key +
										(projectDraft[key as keyof Project] !== selectedProject[key as keyof Project]
											? ' (edited)'
											: '')}
									type={data.schema[key].type}
									{id}
									readonly={data.schema[key].isReadonly}
									bind:value={projectDraft[key as keyof Project]}
								/>
							{/each}
						</div>
					{/if}
				</main>
				<footer>
					<div class="my-2 flex w-full items-center justify-center">
						<button
							class="rounded-md bg-red-500 px-4 py-2 text-xl text-neutral-50 transition-colors"
						>
							Удалить проект
						</button>
					</div>
					<div class="flex w-full justify-between">
						<button
							onclick={save}
							disabled={!affected}
							class:cursor-not-allowed={!affected}
							class:cursor-pointer={affected}
							class:hover:bg-neutral-700={affected}
							class="rounded-md bg-neutral-800 px-4 py-2 text-xl text-neutral-50 transition-colors"
							>Сохранить</button
						>
						<button
							onclick={closeSidebar}
							class="cursor-pointer rounded-md bg-neutral-800 px-4 py-2 text-xl text-neutral-50 transition-colors hover:bg-neutral-700"
							>Отменить</button
						>
					</div>
				</footer>
			</aside>
		</div>
	</div>
{/if}
