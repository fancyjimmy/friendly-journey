<script lang="ts">
	import type { NodeViewProps } from '@tiptap/core';
	import cx from 'clsx';
	import { NodeViewWrapper } from 'svelte-tiptap' ;

	export let node: NodeViewProps['node'];
	export let updateAttributes: NodeViewProps['updateAttributes'];
	export let selected: NodeViewProps['selected'] = false;

	const handleClick = (): void => {
		updateAttributes({ count: node.attrs.count + 1 });
	};

	const PREFIX = "/dynamic/images";
</script>

<NodeViewWrapper
	id="svelte-component"
	class={cx('bg-sky-200/90 border-black border-2 px-4 pb-4 rounded-md flex flex-col my-4', {
    'border-green-500': selected,
    selected,
  })}
	data-drag-handle=""
>
  <span class="bg-black py-1 px-3 text-white rounded-b-md uppercase text-[0.6rem] font-bold w-max"
				contenteditable='false'
	>{node.attrs.title}</span
	>

	<div class='p-1 relative'>
		{#if node.attrs.src}
			<img src='{PREFIX}/{node.attrs.src}' alt={node.attrs.title}>
			<div class='absolute top-1 right-1 border-2 m-2 border-black bg-white rounded divide-x-2 divide-black'>
				<button class='px-1'>edit</button>
				<button class='px-1'>replace</button>
				<button class='px-1'>select</button>
			</div>
		{:else}
			<p class="text-center">Paste Image or Upload</p>
		{/if}
	</div>
</NodeViewWrapper>