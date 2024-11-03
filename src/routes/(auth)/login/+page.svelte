<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import Input from '$lib/components/Input/Input.svelte';

	let { form }: { data: PageData; form: ActionData } = $props();
</script>

<main class="relative flex h-screen w-screen flex-col items-center justify-center">
	{#if form && form.error}
		<div class="absolute top-0 left-1/2 -translate-x-1/2 bg-red-400 px-4 py-4 font-bold text-red-100">
			<span>{form.error}</span>
		</div>
	{/if}
	<div class="flex flex-1 items-center justify-center">
		<div class="rounded-lg bg-neutral-500 px-10 py-4">
			<h1 class="mb-4 text-center text-3xl">Login page</h1>
			<form method="POST" action="?/login" use:enhance class="flex flex-col gap-4">
				<Input
					required
					autocomplete="off"
					label="Username"
					type="text"
					name="username"
					placeholder="ex. Destroyer1283"
				/>
				<Input
					required
					label="Password"
					name="password"
					type="password"
					class="rounded-md text-neutral-800"
				/>

				<button
					type="submit"
					class="rounded-md bg-neutral-200 p-4 text-lg font-bold uppercase text-neutral-800 transition-colors hover:bg-neutral-400"
					>Login</button
				>
			</form>
		</div>
	</div>
</main>
