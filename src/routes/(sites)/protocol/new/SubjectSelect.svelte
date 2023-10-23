<script lang="ts">
	export let subjects =[];

	export let name;
	export let value;
</script>

<select name={name}>
	{#each subjects as subject}
		<option value={subject.id} selected='selected'>{subject.name}</option>
	{/each}
</select>
