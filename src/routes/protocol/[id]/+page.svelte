<script lang="ts">

	import Editor from '$lib/components/Editor.svelte';
	import { setContext } from 'svelte';

	export let data;

	setContext('protocol', data.protocolId);
</script>


<h1 class='p-4 text-5xl font-bold'>{data.protocol.name}</h1>
<Editor
	content={data.protocol.content}
	on:save={async (e) => {
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
