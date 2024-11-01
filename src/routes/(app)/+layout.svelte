<script>
	import NavigationItem from '$lib/components/NavigationItem/NavigationItem.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<header
		class="box-border border border-neutral-700 bg-neutral-600 py-4 text-3xl text-neutral-100"
	>
		<span>Website admin panel</span>
	</header>
	<main class="flex flex-1">
		<aside class="box-border w-64 overflow-hidden border border-neutral-700 bg-neutral-700 px-2">
			<nav>
				<ul class="mt-2 flex flex-col gap-1">
					<NavigationItem href="/projects">Проекты</NavigationItem>
					<NavigationItem href="/files">Файлы</NavigationItem>
				</ul>
			</nav>
		</aside>
		<div class="w-full overflow-scroll">
			<slot />
		</div>
	</main>
</div>
