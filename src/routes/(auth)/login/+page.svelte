<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

{#if form && form.error}
	<div class="px-4 py-4 bg-red-400 text-red-100 font-bold">
		<span>{form.error}</span>
	</div>
{/if}
<form method="POST" action="?/login" use:enhance>
	<label>
		Username
		<input name="username" type="text" />
	</label>
	<label>
		Password
		<input name="password" type="password" />
	</label>
	<button>Log in</button>
</form>
