<script lang="ts">
	export let data;
</script>

<div>
	{data.subject.name}
</div>

{#each data.protocols as protocol}
	<div>
		<a href="/protocol/{protocol.id}">
			{protocol.name}
		</a>
	</div>
{/each}
