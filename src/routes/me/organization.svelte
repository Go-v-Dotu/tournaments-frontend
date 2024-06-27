<script lang="ts">
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import type { TournamentPreview } from 'domain/tournament_management';

	import TournamentsGrid from '$lib/components/tornaments_grid.svelte';

	export let tournamentPreviewsPromise: Promise<TournamentPreview[]>;
</script>

{#await tournamentPreviewsPromise}
	<div class="flex flex-col items-center">
		<LoaderCircle class="size-28 animate-spin md:size-56 " stroke-opacity={0.5} strokeWidth={1} />
	</div>
{:then hostedTournamentPreviews}
	{#if hostedTournamentPreviews.length === 0}
		<div class="flex flex-col items-center">No hosted tournaments yet...</div>
	{:else}
		<TournamentsGrid
			tournaments={hostedTournamentPreviews.map((v) => ({
				date: v.date,
				host: '',
				id: v.id,
				previewUrl: v.previewUrl,
				title: v.title
			}))}
			isToManage
		/>
	{/if}
{/await}
