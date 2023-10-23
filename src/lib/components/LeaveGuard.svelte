<script lang="ts">
	import { beforeNavigate } from '$app/navigation';

	export let leaveAllowed = () => false;

	beforeNavigate((navigation) => {
		if (!leaveAllowed()) {
			const confirmation = confirm('Are you sure you want to leave?');
			if (!confirmation) {
				navigation.cancel();
			}
		}
	});
</script>

<slot />
