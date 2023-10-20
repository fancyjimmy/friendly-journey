<script>
	import TipTapEditor from '$lib/components/tiptap/TipTapEditor.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	import CodeMirror from "svelte-codemirror-editor";
	import { javascript } from "@codemirror/lang-javascript";
	export let content;
	export let value;
</script>

<TipTapEditor on:save={(event) => {dispatch("save", event.detail);}} startContent={content} bind:value></TipTapEditor>
<CodeMirror bind:value lang={javascript()} />
