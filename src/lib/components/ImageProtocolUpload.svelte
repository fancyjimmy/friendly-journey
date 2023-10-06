<script lang="ts">
import ImageInput from '$lib/components/ImageInput.svelte';

export let url = "/api/image";
export let name = "image";
export let file = undefined;
export let protocol = undefined;
export const method = "POST";

function uploadImage (){
	fetch(url, {
		method: "POST",
		body: JSON.stringify({ file, protocol, name }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

</script>

<input type='text' bind:value={name}>

<input type='number' bind:value={protocol}>

<ImageInput bind:value={file}></ImageInput>

<button on:click={() => {uploadImage();}}>Upload</button>