<script lang="ts">
	import type { Tournament } from 'domain/tournament_management';

	import TournamentCard from '$lib/components/tournamnt_card.svelte';

	export let tournaments: Tournament[];

	export let isToManage: boolean = false;
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
	{#each tournaments as tournament (tournament.id)}
		<TournamentCard
			href="tournaments{isToManage ? '/management' : '/participation'}/{tournament.id}"
			{tournament}
			aspectRatio="square"
		/>
	{/each}
</div>
