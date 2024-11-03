<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { HeadersBuilder } from '$lib/api';
	import { SchemaType, type File as FileType } from '$lib/api/types.js';
	import Button from '$lib/components/Button/Button.svelte';
	import TableHeader from '$lib/components/Table/TableHeader.svelte';
	import TextTruncate from '$lib/components/TextTruncate/TextTruncate.svelte';

	const { data } = $props();
	const columns = Object.keys(data.schema);

	async function onUploadFile(event: SubmitEvent) {
		if (!event.target) return;
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const file = formData.get('file') as File;
		if (file && file.size <= 0) {
			console.log('no file.');
			return;
		}

		const headers = new HeadersBuilder().withToken(data.token!).headers();
		const method = 'POST';
		const response = await fetch('/api/static/', {
			method,
			headers,
			body: formData
		});

		const json = await response.json();

		await invalidateAll();
	}

	async function onLinkCopy(file: FileType) {
		const link = `${PUBLIC_BACKEND_URL}/static/${file.fileName}`;
		navigator.clipboard.writeText(link);
		alert('Ссылка скопирована');
	}
</script>

<h1 class="text-3xl">Список файлов...</h1>

<div class="relative w-full overflow-x-auto">
	<table class="mx-4 my-2 border-collapse border-2 border-neutral-600 bg-neutral-600">
		<TableHeader
			schema={{
				...data.schema,
				copy: {
					isArray: false,
					isReadonly: true,
					nullable: false,
					type: SchemaType.STRING
				}
			}}
		/>
		<tbody>
			{#each data.files as file}
				<tr class="border border-neutral-800 transition-colors hover:bg-neutral-400">
					{#each columns as colKey}
						<td class="text-nowrap border border-gray-300 px-4 py-2">
							<TextTruncate maxLength={60} text={file[colKey as keyof FileType]} />
						</td>
					{/each}
					<td>
						<button onclick={() => onLinkCopy(file)}>Copy link</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<div class="mx-auto my-4 max-w-96 rounded-md bg-neutral-500 px-4 py-4">
	<form onsubmit={onUploadFile}>
		<label class="flex flex-col gap-2">
			<span>Select file to upload</span>
			<input name="file" type="file" />
		</label>

		<Button type="submit">Upload</Button>
	</form>
</div>
