<script lang="ts">
	export let subjects =[];

	export let name;
	export let value;
</script>

<select name={name}>
	{#each subjects as subject}
		<option value={subject.id} selected={subject.id == value}>{subject.name}</option>
	{/each}
</select>
