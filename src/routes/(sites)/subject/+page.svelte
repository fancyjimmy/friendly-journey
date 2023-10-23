<script lang="ts">
	export let data;
</script>

{#each data.subjects as subject}
	<div>
		<a href='/subject/{subject.id}'>
		{subject.name}
		</a>
	</div>
{/each}