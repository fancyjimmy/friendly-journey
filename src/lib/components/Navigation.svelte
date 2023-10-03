<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>
<nav class="list-nav">
	<ul>
		<li><a href="/" on:click={drawerClose}>Home</a></li>
		<li><a href="/notes" on:click={drawerClose}>Notes</a></li>
		<li><a href="/categories" on:click={drawerClose}>Categories</a></li>
	</ul>
</nav>