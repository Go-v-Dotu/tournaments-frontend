<script lang="ts">
	import Trophy from 'lucide-svelte/icons/trophy';

	import { Button } from '$lib/components/ui/button';

	import HostTournamentModal from '$lib/components/host_tournament_modal.svelte';
	import LightSwitch from '$lib/components/light_switch.svelte';
	import UserNav from '$lib/components/user_nav.svelte';
	import MobileNav from '$lib/components/nav/mobile_nav.svelte';

	import type { hostTournamentFormSchema } from '$lib/forms/tournament_management';

	import Commander from '$lib/icons/commander.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';

	export let username: string | undefined = undefined;

	export let showHostTournamentButton: boolean = false;

	export let hostTournamentForm: SuperValidated<Infer<typeof hostTournamentFormSchema>>;
</script>

<div
	class="sticky top-0 z-50 flex w-full border-b-2 border-border/40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex-1">
		<nav class="flex justify-between">
			<MobileNav {hostTournamentForm} {username} />
			<div class="hidden h-full items-center sm:visible sm:flex md:gap-1 lg:gap-2">
				<div class="flex">
					<Commander class="mr-4 size-12" />
					<a href="/" aria-current="page" aria-label="tournaments" class="self-end px-4">
						<p class="text-2xl font-extrabold tracking-tight hover:text-foreground/80 md:text-4xl">
							Tournaments
						</p>
					</a>
				</div>
			</div>
			<div class="hidden items-center gap-4 sm:visible sm:flex">
				<div class="{showHostTournamentButton ? '' : 'hidden'} rounded-md bg-muted/50">
					<HostTournamentModal
						actionPath="/?/hostTournament"
						{hostTournamentForm}
						let:modalTriggerBuilder
					>
						<Button builders={[modalTriggerBuilder]}>
							<Trophy class="mr-2 size-4" />
							Host
						</Button>
					</HostTournamentModal>
				</div>
				<div class="invisible flex items-center sm:visible">
					<div class={username === undefined ? 'collapse' : ''}>
						<UserNav username={username || ''} />
					</div>
				</div>
			</div>
		</nav>
	</div>
	<div class="">
		<LightSwitch />
	</div>
</div>
