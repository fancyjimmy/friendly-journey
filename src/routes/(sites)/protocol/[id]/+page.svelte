<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import { onMount, setContext } from 'svelte';
	import { Toast } from 'flowbite-svelte';

	export let data;
	setContext('protocol', data.protocol.id);
	let saved = false;
</script>

<Toast bind:open={saved} color="green" position='top-right'>
	<svelte:fragment slot="icon">
		S
		<span class="sr-only">Check icon</span>
	</svelte:fragment>
	Saved.
</Toast>
<h1 class="p-4 text-5xl font-bold">{data.protocol.name}</h1>
<Editor
	value={data.protocol.content}
	startedValue={data.protocol.content}
	on:save={async (e) => {
		saved = true;
		const content = e.detail;

		// TODO refactor to repository function
		const response = await fetch('/api/protocol', {
			body: JSON.stringify({
				content,
				id: data.protocolId,
				name: data.protocol.name,
				subjectId: data.protocol.subjectId
			}),
			method: 'POST'
		});

		const json = await response.json();
		console.log(json);
	}}
/>
