<script lang="ts">
	import TipTapEditor from '$lib/components/tiptap/TipTapEditor.svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	import { html } from '@codemirror/lang-html';
	import CodeMirrorEditor from '$lib/components/CodeMirror/CodeMirrorEditor.svelte';
	import LeaveGuard from '$lib/components/LeaveGuard.svelte';

	export let value;
	export let startedValue;

	export let codeView = false;
	export const toggleCodeView = () =>  {
		codeView = !codeView;
	}

	onMount(() => {
		value = startedValue;
	});

	function save(text: string) {
		dispatch('save', text);
		startedValue = value;
	}
</script>

<div class="w-full h-full overflow-y-auto">
	<LeaveGuard
		leaveAllowed={() => {
			return startedValue === value;
		}}
	>
		{#if codeView}
			<CodeMirrorEditor
				on:save={(event) => {
					save(event.detail);
				}}
				bind:value
				lang={html()}
			/>
		{:else}
			<TipTapEditor
				on:save={(event) => {
					save(event.detail);
				}}
				startContent={value}
				bind:value><slot /></TipTapEditor
			>
		{/if}
	</LeaveGuard>
</div>
