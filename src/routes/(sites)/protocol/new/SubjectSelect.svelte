<script lang="ts">
	export let subjects =[];

	export let name;
</script>

<select name={name}>
	{#each subjects as subject}
		<option value={subject.id} selected='selected'>{subject.name}</option>
	{/each}
</select>
