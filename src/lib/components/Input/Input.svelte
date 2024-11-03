<script lang="ts">
	import { focus } from '$lib/actions/focus';
	import { type HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		label: string;
	}

	let { label, autofocus, value = $bindable(), ...others }: Props = $props();
</script>

<label class="flex flex-col">
	<span>{label}</span>
	<input
		bind:value
		use:focus={autofocus}
		class={`rounded-md px-4 py-2 text-neutral-800` + (others.class ?? '')}
		{...others}
	/>
</label>
