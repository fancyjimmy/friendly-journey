<script>
	import { Previewer } from 'pagedjs';
	import { onMount } from 'svelte';
	import "../../../../app.css"
	import Titelblatt from '$lib/components/print/Titelblatt.svelte';
	export let data;

	let print = false;
	let container;

	function format(value) {
		return value.replaceAll('svelte-image-component', 'img');
	}
	onMount(() => {
		let paged = new Previewer();
		const content = format(data.protocol.content);
		paged.preview(content, ['/dynamic/css/test.css', '/dynamic/css/basic.css'], container);


// In Svelte 3, do this instead:
// customElements.define('my-element', MyElement);
	});
</script>

<div bind:this={container} />

<style>
</style>
