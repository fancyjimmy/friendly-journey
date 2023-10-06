<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let fileInput;
	let files;

	const dispatch = createEventDispatcher();
	export let showImage = true;

	export let image: string | undefined;
	export let value: string | undefined;
	async function getBase64(image) : Promise<string>{
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}
</script>

<div>
	{#if showImage}
		{#if image}
			<img id="avatar" src={image} alt="avatar" />
		{/if}
	{/if}
	<input
		class="hidden"
		id="file-to-upload"
		type="file"
		accept=".png,.jpg"
		bind:files
		bind:this={fileInput}
		on:change={async () => {
			image = await getBase64(files[0]);
			const imgData = image.split(',');
      value = imgData[1];
			dispatch('change', image);
		}}
	/>
	<button on:click={() => fileInput.click()}>
		<slot>
			Upload Image
		</slot>
	</button>
</div>
