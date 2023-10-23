<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { createEventDispatcher } from 'svelte';
	import { abbreviationTracker, expandAbbreviation } from '@emmetio/codemirror6-plugin';
	import { keymap } from '@codemirror/view';
	import type { Extension } from "@codemirror/state";

	export let value;

	const dispatch = createEventDispatcher()

	function save(){
		dispatch("save", value);
		return true;
	}

	const extensions: Extension[] = [
		keymap.of([{
			key: 'Ctrl-e',
			run: expandAbbreviation
		}]),
		keymap.of([{
			key: "Ctrl-s",
			run: save
		}]),
		abbreviationTracker()
	];

	export let lang;

</script>

<CodeMirror bind:value extensions={extensions} {lang}/>