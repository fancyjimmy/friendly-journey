<script>
	let imageUrl = "";


	const handlePaste = (event) => {
		const items = event.clipboardData.items;

		for (let i = 0; i < items.length; i++) {
			if (items[i].type.indexOf("image") !== -1) {
				const file = items[i].getAsFile();
				const reader = new FileReader();

				reader.onload = (e) => {
					imageUrl = e.target.result;
				};

				reader.readAsDataURL(file);

				// Prevent the default paste action
				event.preventDefault();
				break; // Stop after handling the first image
			}
		}
	};
</script>

<div on:paste={handlePaste}>
	<h2>Paste an image:</h2>
	<img src={imageUrl} alt="Pasted" />
</div>
