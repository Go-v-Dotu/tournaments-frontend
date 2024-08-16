<script lang="ts">
	import type { PageData } from './$types';

	import * as Tabs from '$lib/components/ui/tabs';

	import { playersStore } from '$lib/stores/players';

	import Configuration from './configuration.svelte';
	import Standings from './tournament_manager.svelte';
	import Players from './players.svelte';

	export let data: PageData;

	const { addGuestPlayerForm, playersPromise } = data;

	playersPromise.then((players) => {
		playersStore.set([
			...players,
			...players,
			...players,
			...players,
			...players,
			...players,
			...players
		]);
	});

	const enum TabValue {
		Players = 'players',
		TournamentManager = 'tornament manager',
		Configuration = 'configuration'
	}
</script>

<div>
	<Tabs.Root value={TabValue.Players} class="flex h-full flex-col space-y-4 p-8 pt-6">
		<div class="mb-4 flex flex-col items-start gap-4">
			<Tabs.List>
				<Tabs.Trigger value={TabValue.Players}>Players</Tabs.Trigger>
				<Tabs.Trigger value={TabValue.TournamentManager}>Tournament Manager</Tabs.Trigger>
				<Tabs.Trigger value={TabValue.Configuration}>Configuration</Tabs.Trigger>
			</Tabs.List>
		</div>

		<Tabs.Content value={TabValue.Players}>
			<Players {addGuestPlayerForm} {playersPromise} />
		</Tabs.Content>
		<Tabs.Content value={TabValue.TournamentManager}>
			<Standings {addGuestPlayerForm} {playersPromise} />
		</Tabs.Content>
		<!-- <Tabs.Content value={TabValue.Configuration}>
		<Configuration />
	</Tabs.Content> -->
	</Tabs.Root>
</div>
