<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';

	interface Props {
		href: string;
		children: Snippet;
	}
	const { href, children }: Props = $props();

	let active = $derived.by(() => {
		return $page.url.pathname.startsWith(href);
	});
</script>

<li
	class:bg-neutral-800={active}
	class="rounded-lg text-neutral-50 transition-colors hover:bg-neutral-600"
>
	<a {href} class:underline={active} class="block px-2 py-4 text-xl">
		<span>{@render children()}</span>
	</a>
</li>
