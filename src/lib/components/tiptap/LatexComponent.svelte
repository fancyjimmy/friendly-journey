<script lang="ts">
	import cx from 'clsx';
	import type { NodeViewProps } from '@tiptap/core';
	import { NodeViewContent, NodeViewWrapper } from 'svelte-tiptap';
	import Katex from 'svelte-katex';
	import { onMount, tick } from 'svelte';

	export let selected: NodeViewProps['selected'] = false;
	let edit = true;

	export let node;


	$: console.log(node);

	let content = "";
	onMount(() => {
		content = node.textContent;
	})

</script>

<NodeViewWrapper
	id="svelte-component"
	class={cx('bg-yellow-200/90 border-black border-2 px-4 pb-4 rounded-md flex flex-col my-4', {
		'border-green-500': selected,
		selected
	})}
	contenteditable='true'
	data-drag-handle=""
>
	<button
		on:click={() => {
			edit = !edit;
			content = node.textContent;
		}} contenteditable='false'>Hallo</button
	>
	{#if edit}
		<NodeViewContent as='textarea' contenteditable='true' bind:value={content}></NodeViewContent>
	{:else}
		<Katex>{content}</Katex>
	{/if}
</NodeViewWrapper>
