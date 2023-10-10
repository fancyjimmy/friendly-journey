<script lang="ts">
import ImageInput from '$lib/components/ImageInput.svelte';
import { IMAGE_UPLOAD_API_URL } from '$lib/constants';

export let name = "image";
export let file = undefined;
export let protocol = undefined;
export const method = "POST";

function uploadImage (){
	fetch(IMAGE_UPLOAD_API_URL, {
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