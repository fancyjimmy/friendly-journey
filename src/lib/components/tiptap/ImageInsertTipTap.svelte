<script lang="ts">
	import type { NodeViewProps } from '@tiptap/core';
	import cx from 'clsx';
	import { NodeViewWrapper } from 'svelte-tiptap';
	import { IMAGE_UPLOAD_API_URL } from '$lib/constants';
	import { getContext } from 'svelte';

	type NodeViewPropsExtended = NodeViewProps['node'] & {
		attrs: {
			src: string;
			title: string;
			saved: boolean;
		};
	};

	export let node: NodeViewPropsExtended;
	export let updateAttributes: NodeViewProps['updateAttributes'];
	export let selected: NodeViewProps['selected'] = false;

	let protocol = getContext('protocol');

	async function uploadImage() {
		const image = node.attrs.src.split(',')[1];
		const result = await fetch(IMAGE_UPLOAD_API_URL, {
			method: 'POST',
			body: JSON.stringify({ file: image, protocol, name: newTitle }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const json = await result.json();

		updateAttributes({
			src: `${PREFIX}/${json.file}`,
			title: json.name,
			saved: true
		});
	}

	const PREFIX = '/dynamic/images';
	let newTitle = '';
</script>

<NodeViewWrapper
	id="svelte-component"
	class={cx('bg-yellow-200/90 border-black border-2 px-4 pb-4 rounded-md flex flex-col my-4', {
		'border-green-500': selected,
		selected
	})}
	data-drag-handle=""
>
	<span contenteditable="false">{node.attrs.title}</span>

	<div class="p-1 relative">
		{#if !node.attrs.src}
			<p>Kein Bild</p>
		{:else}
			{#if node.attrs.saved}
					<img src="{node.attrs.src}" alt={node.attrs.title} />
					<div
						class="absolute top-1 right-1 border-2 m-2 border-black bg-white rounded divide-x-2 divide-black"
					>
						<button class="px-1">edit</button>
						<button class="px-1">replace</button>
						<button class="px-1">select</button>
					</div>
			{:else}
				SAVE
				<input type="text" bind:value={newTitle} placeholder="Name" />
				<img src={node.attrs.src} alt={node.attrs.title} />
				<button
					on:click={() => {
					uploadImage();
				}}>Save</button
				>
			{/if}
		{/if}

	</div>
</NodeViewWrapper>
