<script lang="ts">
	import SubjectSelect from './SubjectSelect.svelte';

	export let data;
</script>

<form method="POST">
	<input type="text" name="name" />
	<textarea name="content" />
	<SubjectSelect name='subjectId' subjects={data.subjects} />
	<button type="submit">submit</button>
</form>

<style>
	input,
	button,
	textarea {
		@apply border;
		display: block;
	}
</style>
