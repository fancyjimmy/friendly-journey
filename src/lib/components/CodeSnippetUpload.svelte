<script lang="ts">
	import ImageInput from '$lib/components/ImageInput.svelte';

	export let url = "/api/codesnippet";
	export let name = "";
	export let content = "";
	export const method = "POST";
	function uploadImage (){
		fetch(url, {
			method: "POST",
			body: JSON.stringify({ content, name }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

</script>

<input type='text' bind:value={name} required>
<textarea bind:value={content}></textarea>

<button on:click={() => {uploadImage();}}>Upload</button>