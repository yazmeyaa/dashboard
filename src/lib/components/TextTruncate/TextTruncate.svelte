<script lang="ts">
	const { maxLength = 48, text }: { text: string | number | undefined | null; maxLength?: number } =
		$props();
</script>

<span class="overflow-hidden whitespace-nowrap">
	{#if text === undefined || text === null}
		{'<ПУСТОЕ ПОЛЕ>'}
	{:else if text.toString().length > maxLength}
		{text.toString().substring(0, maxLength - 3)}...
	{:else}
		{text}
	{/if}
</span>
