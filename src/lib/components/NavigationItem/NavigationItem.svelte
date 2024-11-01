<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		children: Snippet;
	}
	const { href, children }: Props = $props();
</script>

<li class="text-neutral-50 transition-colors hover:bg-neutral-600 rounded-lg">
	<a {href} class="block px-2 py-4 text-xl">
		<span>{@render children()}</span>
	</a>
</li>
