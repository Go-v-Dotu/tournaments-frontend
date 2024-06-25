<script lang="ts">
	import type { PageData } from './$types';

	import Trophy from 'lucide-svelte/icons/Trophy';

	import { cn } from '$lib/utils';

	import { buttonVariants } from '$lib/components/ui/button';
	import * as PageHeader from '$lib/components/ui/page_header';

	import TournamentCard from '$lib/components/tournamnt_card.svelte';

	export let data: PageData;

	const upcomingTournaments = data.upcomingTournaments;
</script>

<PageHeader.Root class="pb-8">
	<PageHeader.Heading>Welcome to Tournaments</PageHeader.Heading>
	<PageHeader.Description class="text-muted-foreground">
		Host and Join High-Stakes Tournaments - Free of Charge!
	</PageHeader.Description>

	<p class="text-md max-w-[750px] text-center text-muted-foreground sm:text-xl">
		Epic Prizes. Prestigious Titles. Join Now!
	</p>

	<div class="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
		<a href="/docs" class={cn(buttonVariants())}> <Trophy class="mr-2 size-4" /> Host </a>
		<a href="/" target="_blank" rel="noreferrer" class={cn(buttonVariants({ variant: 'outline' }))}>
			GitHub
		</a>
	</div>
</PageHeader.Root>

<div class="gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
	{#each upcomingTournaments as upcomingTournament (upcomingTournament.id)}
		<TournamentCard tournament={upcomingTournament} width={100} height={100} aspectRatio="square" />
	{/each}
</div>
