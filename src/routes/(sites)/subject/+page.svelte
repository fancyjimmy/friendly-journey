<script lang="ts">
	export let data;
</script>

<div class="flex flex-col gap-3 p-3">
	{#each data.subjects as subject}
		<a href="/subject/{subject.id}" class="bg-orange-500 hover:bg-orange-600 duration-100 text-2xl font-extrabold text-white cool-container p-5">
			{subject.name}
		</a>
	{/each}
</div>
