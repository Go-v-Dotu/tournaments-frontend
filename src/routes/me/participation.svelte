<script lang="ts">
	import LoadSpinner from '$lib/components/load_spinner.svelte';

	import type { HostedTournamentPreview } from 'domain/tournament_management';

	export let hostedTournamentPreviewsPromise: Promise<HostedTournamentPreview[]>;
</script>

{#await hostedTournamentPreviewsPromise}
	<LoadSpinner />
{:then hostedTournamentPreviews}
	{#if hostedTournamentPreviews.length === 0}
		<div class="flex flex-col items-center">No hosted tournaments yet...</div>
	{:else}
		{#each hostedTournamentPreviews as item}
			<p>
				{item.title}
			</p>
		{/each}
	{/if}
{/await}
