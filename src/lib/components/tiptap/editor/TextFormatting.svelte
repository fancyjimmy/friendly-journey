<script lang="ts">
	export let toggleText: {
		toggleBold: () => void;
		toggleItalic: () => void;
		toggleUnderline: () => void;
		toggleStrike: () => void;
		toggleCode: () => void;
		toggleOrderedList: () => void;
		toggleUnorderedList: () => void;
		alignLeft: () => void;
		alignCenter: () => void;
		alignRight: () => void;
		unsetAlignment: () => void;
	};
</script>

<div class=" flex gap-2">
	<div class="flex gap-1 icon-button-container blue">
		<button class="icon-button" on:click={toggleText.toggleBold}
			><svg
				class="icon dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 14 16"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 1h4.5a3.5 3.5 0 1 1 0 7H3m0-7v7m0-7H1m2 7h6.5a3.5 3.5 0 1 1 0 7H3m0-7v7m0 0H1"
				/>
			</svg></button
		>
		<button class="icon-button" on:click={toggleText.toggleItalic}
			><svg
				class="icon dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 14 16"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m3.874 15 6.143-14M1 15h6.33M6.67 1H13"
				/>
			</svg></button
		>
		<button class="icon-button" on:click={toggleText.toggleUnderline}
			><svg
				class="icon dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 16 20"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 1v9.5a4.5 4.5 0 1 1-9 0V1M1 1h4m5 0h4M1 19h14"
				/>
			</svg></button
		>
		<button class="icon-button" on:click={toggleText.toggleStrike}
			><svg
				class="icon dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 16 16"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 3V2h10v1M4 14h4m-1.245-3.018L6 14M9 2 7.579 7.579m0 0L1 1m6.579 6.579L15 15"
				/>
			</svg>
		</button>
		<button class="icon-button" on:click={toggleText.toggleCode}
			><svg
				class="icon dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 16"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"
				/>
			</svg></button
		>
	</div>

	<div class="flex gap-1 icon-button-container green">
		<button class="icon-button" on:click={toggleText.toggleUnorderedList}
			><svg
				class="icon dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 17 10"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-width="2"
					d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"
				/>
			</svg></button
		>
		<button class="icon-button" on:click={toggleText.toggleOrderedList}
			><svg
				class="icon dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 21 18"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"
				/>
			</svg>
		</button>
	</div>

	<div class="flex gap-1 icon-button-container yellow">
		<button class="icon-button" on:click={toggleText.alignLeft}
			><svg
				class="icon dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 14 14"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 1h8M1 5h12M3 9h8M1 13h12"
				/>
			</svg></button
		>
		<button class="icon-button" on:click={toggleText.alignCenter}
			><svg
				class="icon dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 14 14"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 1h8M1 5h12M3 9h8M1 13h12"
				/>
			</svg></button
		>
		<button class="icon-button" on:click={toggleText.alignRight}
			><svg
				class="icon"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 14 14"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 1h8M1 5h12M3 9h8M1 13h12"
				/>
			</svg></button
		>
	</div>
</div>

<style>
	.blue {
		@apply bg-sky-300;
	}
	.green {
		@apply bg-lime-300;
	}
	.yellow {
		@apply bg-yellow-300;
	}

	.green .icon-button:hover {
		@apply bg-lime-400;
	}
	.blue .icon-button:hover {
		@apply bg-sky-400;
	}
	.yellow .icon-button:hover {
		@apply bg-yellow-400;
	}
	.icon-button {
		@apply p-2 aspect-square h-full rounded-md flex items-center justify-center duration-100;
	}
	.icon {
		@apply w-3.5 h-3.5 text-gray-800;
	}
	.icon-button:hover {
		@apply scale-125;
	}
	.icon-button-container {
		@apply cool-container;
	}
</style>
