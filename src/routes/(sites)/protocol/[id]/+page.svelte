<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import { onMount, setContext } from 'svelte';
	import { Toast } from 'flowbite-svelte';
	import { upsertProtocol } from '$lib/api/frontend/protocol';

	export let data;
	setContext('protocol', data.protocol.id);
	let saved = false;

	$: images = data.images;
	$: codeSnippets = data.codeSnippets;
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
		const json = await upsertProtocol(content, data.protocolId, data.protocol.name, data.protocol.subjectId);
		console.log(json);
	}}
><a href='/print/protocol/{data.protocolId}' class='flex justify-center items-center cool-container uppercase text-black bg-orange-400 font-extrabold'>
	<div class='hover:bg-orange-500 hover:scale-125 duration-100 px-1 border-black rounded'>
		PRINT
	</div>
</a></Editor>
