<script>
	import PageBreak from "$lib/PageBreak.svelte";

	export let titel = "Titel";
	export let name = "Jimmy Fan";
	export let angabeDatum = new Date().toLocaleDateString();
	export let abgagbeDatum = new Date().toLocaleDateString();
	export let klasse = "4AHIF";
	export let gruppe = "01";
</script>

{#if true}
	<div class="titelpage">
		<h1>{titel}</h1>
		<div class="grid">
			<h3>Klasse</h3>
			<p>{klasse}</p>
			<h3>Gruppe</h3>
			<p>{gruppe}</p>
			<h3>Name</h3>
			<p>{name}</p>
			<div class="flex justify-between">
				<h3>Angabe</h3>
				<p> {angabeDatum}</p>

			</div>

			<div class="flex justify-between">
				<h3>Abgabe</h3>
				<p>{abgagbeDatum}</p>
			</div>

		</div>

		<h3 class="mb-5">Kurzbeschreibung</h3>
		<hr class="border-2 border-lime-700 my-5">
		<p class="bg-lime-300 p-5 rounded-xl">
			<slot/>
		</p>

	</div>
	<PageBreak/>
{:else}
	<h1>{titel}</h1>
{/if}


<style>
    @page :first {
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 50px;
        align-items: center;
        margin-bottom: 4em;
    }

    h1 {
        font-size: 5rem;
        margin-bottom: 4rem;
    }

    h3 {
        font-size: 1.75rem;
        margin: 0;
    }

    p {
        font-size: 1.25rem;
        margin: 0;
    }



</style>
