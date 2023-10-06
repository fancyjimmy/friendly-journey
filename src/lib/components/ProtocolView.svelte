<script lang="ts">
	type Protocol = {
		subject: {
			name: string;
		};
		content: string;
		codeSnippets: string[];
		images: string[];
	};
	export let protocol: Protocol;
</script>

<div>
	<h1>{protocol.subject.name}</h1>
	<p>{protocol.content}</p>
	{#each protocol.codeSnippets as codeSnippet}
		<code>{codeSnippet.content}</code>
	{/each}
	{#each protocol.images as image}
		<img src="/dynamic/images/{image.name}" alt='{image.name}'/>
	{/each}
</div>
