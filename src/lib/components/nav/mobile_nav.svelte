<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import type { Infer, SuperValidated } from 'sveltekit-superforms';

	import * as Sheet from '$lib/components/ui/sheet';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import HostTournamentModal from '$lib/components/host_tournament_modal.svelte';
	import { hostTournamentFormSchema } from '$lib/forms/tournament_management';

	import Menu from 'lucide-svelte/icons/menu';
	import Trophy from 'lucide-svelte/icons/trophy';

	import Commander from '$lib/icons/commander.svelte';
	import { API_V1_PREFIX, HTTPMethod } from '$lib/constants';

	import MobileLink from './mobile_link.svelte';

	let open = false;

	export let hostTournamentForm: SuperValidated<Infer<typeof hostTournamentFormSchema>>;
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden"
		>
			<Menu class="h-5 w-5" />
			<span class="sr-only">Toggle Menu</span>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="flex flex-col items-center pr-0">
		<MobileLink href="/" class="flex items-center" bind:open>
			<Commander class="mr-2 h-8 w-8" />
		</MobileLink>
		<div class=" mr-4 flex flex-1 flex-col gap-2">
			<a
				href="/"
				class={buttonVariants({ variant: 'outline' })}
				on:click={async () => {
					open = false;
				}}
			>
				Tournaments
			</a>
			<Button
				variant="outline"
				on:click={async () => {
					await goto('/me');
					open = false;
				}}
			>
				My account
			</Button>
			<HostTournamentModal
				actionPath="/?/hostTournament"
				{hostTournamentForm}
				let:modalTriggerBuilder
				onTournamentHosted={() => {
					open = false;
				}}
			>
				<Button builders={[modalTriggerBuilder]}>
					<Trophy class="mr-2 size-4" />
					Host
				</Button>
			</HostTournamentModal>
			<Button
				variant="outline"
				class=" mt-auto "
				on:click={async () => {
					const response = await fetch(`${API_V1_PREFIX}/sign-out`, { method: HTTPMethod.POST });
					goto('/');
					open = false;
					await invalidateAll();
				}}
			>
				Log out
			</Button>
		</div>
	</Sheet.Content>
</Sheet.Root>
