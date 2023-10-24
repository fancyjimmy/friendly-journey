<script lang="ts">
	export let data;
</script>

<div class="p-5 text-5xl font-bold">
	{data.subject.name}
</div>

<div class="flex flex-col gap-5 p-5">
	{#each data.protocols as protocol}
		<a href="/protocol/{protocol.id}" class="cool-container p-4 text-xl bg-sky-300">
			<div class='font-bold'>
				{protocol.name}
			</div>
			<div class="text-sm font-semibold">
				{protocol.createdAt.toLocaleString()}
			</div>
		</a>
	{/each}
</div>
