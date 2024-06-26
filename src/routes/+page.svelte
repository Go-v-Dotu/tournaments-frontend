<script lang="ts">
	import type { PageData } from './$types';

	import Trophy from 'lucide-svelte/icons/trophy';
	import Flame from 'lucide-svelte/icons/flame';
	import ChevronsDown from 'lucide-svelte/icons/chevrons-down';

	import { cn } from '$lib/utils';

	import { buttonVariants, Button } from '$lib/components/ui/button';
	import * as PageHero from '$lib/components/ui/page_hero';
	import * as PageSection from '$lib/components/ui/page_section';

	import SignUpModal from './sign_up_modal.svelte';
	import SignInModal from './sign_in_modal.svelte';
	import TournamentsGrid from './tornaments_grid.svelte';
	import HostTournamentModal from '$lib/components/host_tournament_modal.svelte';

	export let data: PageData;

	const featuredTournaments = data.featuredTournaments;
	const upcomingTournaments = data.upcomingTournaments;

	let signUpDialogOpened = false;
</script>

<div>
	<PageHero.Root>
		<PageHero.Heading>Welcome to Tournaments</PageHero.Heading>
		<PageHero.Description class="text-muted-foreground">
			Host and Join High-Stakes Tournaments - Free of Charge!
		</PageHero.Description>
		<p class="text-md max-w-[750px] text-center text-muted-foreground sm:text-xl">
			Epic Prizes. Prestigious Titles. Join Now!
		</p>
		<div class="grid grid-cols-2 gap-2 py-4">
			{#if data.user === null}
				<SignUpModal
					let:modalTriggerBuilder
					signUpForm={data.signUpForm}
					dialogOpened={signUpDialogOpened}
				>
					<Button builders={[modalTriggerBuilder]}>Sign Up</Button>
				</SignUpModal>

				<SignInModal
					let:modalTriggerBuilder
					signInForm={data.signInForm}
					on:signupRequired={() => {
						signUpDialogOpened = true;
					}}
				>
					<Button
						variant="secondary"
						class="border border-card-foreground"
						builders={[modalTriggerBuilder]}>Sign In</Button
					>
				</SignInModal>
			{:else}
				<HostTournamentModal
					actionPath="?/hostTournament"
					hostTournamentForm={data.hostTournamentForm}
					let:modalTriggerBuilder
				>
					<Button builders={[modalTriggerBuilder]}><Trophy class="mr-2 size-4" /> Host</Button>
				</HostTournamentModal>
				<a
					href="/me"
					class={cn(buttonVariants({ variant: 'outline' }), 'border border-card-foreground')}
				>
					My Account
				</a>
			{/if}
		</div>
	</PageHero.Root>

	<div>
		<div class="sticky top-0 z-10 bg-background/90">
			<PageSection.Root icon={Flame} class="container">
				<div>
					<PageSection.Heading>
						<div class="flex items-center gap-4">Featured Tournaments</div>
					</PageSection.Heading>
					<PageSection.Description class="text-muted-foreground">
						Get ready to dive into the most anticipated competitions!
					</PageSection.Description>
				</div>
			</PageSection.Root>
		</div>
		<div class="container">
			<TournamentsGrid tournaments={featuredTournaments} />
		</div>
	</div>

	<div>
		<div class="sticky top-0 z-10 bg-background/90">
			<PageSection.Root icon={ChevronsDown} class="container">
				<PageSection.Heading>Upcoming Tournaments</PageSection.Heading>
				<PageSection.Description class="text-muted-foreground">
					Upcoming Tournaments Are Just Around the Corner!
				</PageSection.Description>
			</PageSection.Root>
		</div>
		<div class="container">
			<TournamentsGrid tournaments={upcomingTournaments} />
		</div>
	</div>
</div>
