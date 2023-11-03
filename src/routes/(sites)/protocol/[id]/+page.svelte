<script lang="ts">
	import '../../../../splitpane.scss';
	import Editor from '$lib/components/Editor.svelte';
	import { onMount, setContext } from 'svelte';
	import { Toast } from 'flowbite-svelte';
	import { upsertProtocol } from '$lib/api/frontend/protocol';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import { html } from 'js-beautify';

	export let data;
	onMount(() => {
		data.protocol.value = html(data.protocol.value);
	});
	setContext('protocol', data.protocolId);
	let saved = false;
	let toggleCodeView;

	$: images = data.protocol?.images;
	$: codeSnippets = data.protocol?.codeSnippets;
</script>

<Splitpanes horizontal={false} class="h-full bg-white" theme="modern-theme">
	<Pane minSize={20} size={25} maxSize={50} class="bg-white">
		<Toast bind:open={saved} color="green" position="top-left">
			<svelte:fragment slot="icon">
				S
				<span class="sr-only">Check icon</span>
			</svelte:fragment>
			Saved.
		</Toast>
		<h1 class="p-4 text-3xl font-bold">{data.protocol.name}</h1>
		<button
			on:click={() => {
				toggleCodeView();
			}}>ToggleCodeView</button
		>
		<ul>
			{#each images as image}
				<li>
					<a target='_blank' href='/dynamic/images/{image.file}'>
					View
					</a>
					{image.name}
				</li>
			{/each}
		</ul>
		<ul>
			{#each codeSnippets as codeSnippet}
				<li>
					{codeSnippet.name}
				</li>
			{/each}
		</ul>
	</Pane>
	<Pane maxSize={80} class="bg-white">
		<Editor
			value={data.protocol.content}
			startedValue={data.protocol.content}
			bind:toggleCodeView
			on:save={async (e) => {
				saved = true;
				const content = e.detail;
				const json = await upsertProtocol(
					content,
					data.protocolId,
					data.protocol.name,
					data.protocol.subjectId
				);
				console.log(json);
			}}
			><a
				href="/print/protocol/{data.protocolId}"
				class="flex justify-center items-center cool-container uppercase text-black bg-orange-400 font-extrabold"
			>
				<div class="hover:bg-orange-500 hover:scale-125 duration-100 px-1 border-black rounded">
					PRINT
				</div>
			</a></Editor
		>
	</Pane>
</Splitpanes>
