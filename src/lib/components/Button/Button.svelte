<script lang="ts">
	import { focus } from '$lib/actions/focus';
	import type { Snippet } from 'svelte';
	import { type HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		children: Snippet;
	}

	let { autofocus, children, ...others }: Props = $props();
</script>

<label class="flex flex-col">
	<button
		class={`rounded-md bg-neutral-200 p-4 text-lg font-bold uppercase text-neutral-800 transition-colors hover:bg-neutral-400` +
			(others.class ?? '')}
		{...others}
	>
		<span>{@render children()}</span>
	</button>
</label>
