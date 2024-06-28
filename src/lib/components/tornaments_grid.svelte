<script lang="ts">
	import type { TournamentPreview as HostedTournamentPreview } from 'domain/tournament_management';
	import type { TournamentPreview as ParticipatedTournamentPreview } from 'domain/tournament_participation';

	import TournamentCard from '$lib/components/tournamnt_card.svelte';

	export let tournaments: HostedTournamentPreview[] | HostedTournamentPreview[];

	export let purpose: 'management' | 'participation' | '' = '';

	tournaments.sort((a, b) => a.date.getTime() - b.date.getTime());
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
	{#each tournaments as tournament (tournament.id)}
		<TournamentCard
			href="tournaments/{tournament.id}{purpose ? `/${purpose}` : ''}"
			{tournament}
			aspectRatio="square"
			showHost={purpose !== 'management'}
		/>
	{/each}
</div>
