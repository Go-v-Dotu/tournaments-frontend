<script lang="ts">
	import type { Tournament } from 'domain/tournaments';

	export let tournaments: Tournament[];

	import TournamentCard from '$lib/components/tournamnt_card.svelte';
</script>

<div class="container">
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
		{#each tournaments as tournament (tournament.id)}
			<TournamentCard {tournament} aspectRatio="square" />
		{/each}
	</div>
</div>
