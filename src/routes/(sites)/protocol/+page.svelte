<script lang="ts">
	export let data;
</script>

<div class="flex gap-3 flex-col p-3">
	{#each data.protocols as protocol}
		<a href='/protocol/{protocol.id}' class="cool-container bg-sky-400 p-4 hover:bg-sky-300 relative">
				<div class='text-3xl font-bold'>{protocol.name}</div>
				<div class='top-2 right-2 absolute p-1 border-2 rounded border-black bg-white'>
					{protocol.subject.name}
				</div>
				<div class='font-semibold text-sm'>{protocol.createdAt.toLocaleString()}</div>
		</a>
	{/each}
</div>
