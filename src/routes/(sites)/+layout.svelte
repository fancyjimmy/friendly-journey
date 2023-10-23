<script lang="ts">
	import '../../app.css';
	import { colors } from '$lib/constants';


	const navEntries = [
		{ name: 'Home', href: '/' },
		{ name: 'Protocols', href: '/protocol' },
		{ name: 'Subjects', href: '/subject' },
		{ name: 'Math', href: '/math' }
	];

</script>

<div class="flex flex-col h-screen w-screen">
	<nav class="shadow top-0 w-screen uppercase font-mono border-b flex justify-between">
		<ul class="flex font-semibold text-sm">
			{#each navEntries as navEntry, i (navEntry.href)}
				<li
					class="p-2 duration-200 hover-custom-bg-color"
					style="--hover-bg-color: {colors[i % colors.length]}"
				>
					<a href={navEntry.href}>{navEntry.name}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="flex-auto relative">
		<div class="absolute inset-0 m-0 overflow-y-auto">
			<slot />
		</div>
	</div>
</div>

<style>
	.hover-custom-bg-color:hover {
		--hover-bg-color: #f5272d;
		background-color: var(--hover-bg-color);
		opacity: 0.8;
	}
</style>
