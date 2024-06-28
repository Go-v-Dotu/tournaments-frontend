<script lang="ts">
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import TournamentsGrid from '$lib/components/tornaments_grid.svelte';

	import type { TournamentPreview } from 'domain/tournament_participation';

	export let participatedTournamentPreviewsPromise: Promise<TournamentPreview[]>;
</script>

{#await participatedTournamentPreviewsPromise}
	<div class="flex flex-col items-center">
		<LoaderCircle class="size-28 animate-spin md:size-56 " stroke-opacity={0.5} strokeWidth={1} />
	</div>
{:then participatedTournamentPreviews}
	{#if participatedTournamentPreviews.length === 0}
		<div class="flex flex-col items-center">No hosted tournaments yet...</div>
	{:else}
		<TournamentsGrid tournaments={participatedTournamentPreviews} purpose="participation" />
	{/if}
{/await}
