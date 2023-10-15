<script lang="ts">

	export let url = "/api/codesnippet";
	export let name = "";
	export let content = "";
	export const method = "POST";
	function uploadImage (){
		fetch(url, {
			method: method,
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