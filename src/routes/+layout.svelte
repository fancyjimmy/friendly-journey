<script lang="ts">
	import '../theme.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';


	import {
		AppBar,
		AppShell,
		Drawer,
		drawerStore,
		LightSwitch,
		Modal
	} from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';

	export let data;
</script>

<Modal />

<Drawer>
	<h2 class="p-4">Navigation</h2>
	<hr />
	<Navigation />
</Drawer>

<AppShell slotSidebarLeft="bg-surface-600/5 w-56 p-4 hidden lg:block">
	<svelte:fragment slot="header">
		<AppBar background="bg-surface-300-600-token">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button
						class="lg:hidden btn btn-sm mr-4"
						on:click={() => {
							drawerStore.open({});
						}}
					>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<strong class="text-xl uppercase">[TODO]</strong>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<!-- Hidden below Tailwind's large breakpoint -->
		<Navigation />
	</svelte:fragment>
	<slot />
</AppShell>

<Modal />
