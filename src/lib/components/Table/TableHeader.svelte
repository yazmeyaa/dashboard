<script lang="ts">
	import type { Schema } from '$lib/api/types';

	interface Props {
		schema: Schema;
	}
	const { schema }: Props = $props();
	const columns = Object.keys(schema);
</script>

<thead>
	<tr>
		{#each columns as column}
			<th class="border border-gray-300 px-4 py-2 text-left">{column}</th>
		{/each}
	</tr>
</thead>
