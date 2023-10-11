<script lang="ts">
	export let data;
</script>

<div class="flex gap-3 flex-col">
	{#each data.protocols as protocol}
		<a href='/protocol/{protocol.id}' class="bg-sky-300 p-2">
			<ul>
				<li>{protocol.name}</li>
				<li>{protocol.createdAt.toLocaleString()}</li>
				<li>
					{protocol.subject.name}
				</li>
			</ul>
		</a>
	{/each}
</div>
