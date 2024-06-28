<script lang="ts">
	import type { PageData } from './$types';

	import { get } from 'svelte/store';
	import { page } from '$app/stores';

	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import {
		addPagination,
		addResizedColumns,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';

	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import UserPlus from 'lucide-svelte/icons/user-plus';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	import PlayerStatusTag from '$lib/components/player_status_tag.svelte';

	import type { Player } from 'domain/tournament_management';

	import { playersStore } from '$lib/stores/players';

	import { API_V1_PREFIX, HTTPMethod } from '$lib/constants';
	import LoadSpinner from '$lib/components/load_spinner.svelte';

	import AddGuestPlayerModal from './add_guest_player_modal.svelte';
	import DropPlayerButton from './drop_player_button.svelte';
	import RecoverPlayerButton from './recover_player_button.svelte';

	export let data: PageData;

	data.playersPromise.then((players) => {
		playersStore.set(players);
	});

	const addPlayer = (player: Player) => {
		playersStore.set([...get(playersStore), player]);
	};

	const dropPlayer = async (playerId: string) => {
		playersStore.update((players) => {
			const playerToDrop = players.find((v) => v.playerId === playerId);
			if (playerToDrop) {
				playerToDrop.dropped = true;
			}
			return players;
		});
		const endpoint = `${API_V1_PREFIX}/tournaments/${$page.params.tournament_id}/players/${playerId}/drop`;
		await fetch(endpoint, { method: HTTPMethod.POST });
	};

	const recoverPlayer = async (playerId: string) => {
		playersStore.update((players) => {
			const playerToDrop = players.find((v) => v.playerId === playerId);
			if (playerToDrop) {
				playerToDrop.dropped = false;
			}
			return players;
		});
		const endpoint = `${API_V1_PREFIX}/tournaments/${$page.params.tournament_id}/players/${playerId}/recover`;
		await fetch(endpoint, { method: HTTPMethod.POST });
	};

	const table = createTable(playersStore, {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),

		resize: addResizedColumns({})
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'username',
			header: 'Username'
		}),
		table.column({
			accessor: 'dropped',
			header: 'Status',
			cell: ({ value }) => createRender(PlayerStatusTag, { status: value ? 'dropped' : 'joined' }),
			plugins: {
				sort: {
					disable: true
				},
				resize: { initialWidth: 200 }
			}
		}),
		table.column({
			accessor: ({ playerId, dropped }) => ({ playerId, dropped }),
			header: '',
			cell: ({ value: { playerId, dropped } }) =>
				dropped
					? createRender(RecoverPlayerButton, {
							onPlayerRecover: () => recoverPlayer(playerId)
						})
					: createRender(DropPlayerButton, {
							onPlayerDrop: () => dropPlayer(playerId)
						}),
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				},
				resize: { initialWidth: 80 }
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
</script>

<div>
	<div class="flex items-center justify-between py-4">
		<Input class="max-w-sm" placeholder="Filter users..." type="text" bind:value={$filterValue} />
		<div class="mr-24">
			<AddGuestPlayerModal
				let:modalTriggerBuilder
				addGuestPlayerForm={data.addGuestPlayerForm}
				actionPath="?/addGuestPlayer"
				onGuestAdded={addPlayer}
			>
				<Button builders={[modalTriggerBuilder]}>
					<UserPlus class="mr-2 size-4" />
					Add Guest
				</Button>
			</AddGuestPlayerModal>
		</div>
	</div>

	{#await data.playersPromise}
		<LoadSpinner />
	{:then players}
		<div class="rounded-md border">
			<Table.Root {...$tableAttrs}>
				<Table.Header>
					{#each $headerRows as headerRow}
						<Subscribe rowAttrs={headerRow.attrs()}>
							<Table.Row>
								{#each headerRow.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
										<Table.Head {...attrs}>
											{#if cell.id == 'username'}
												<Button variant="ghost" on:click={props.sort.toggle}>
													<Render of={cell.render()} />
													<ArrowUpDown class={'ml-2 h-4 w-4'} />
												</Button>
											{:else}
												<Render of={cell.render()} />
											{/if}
										</Table.Head>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Header>
				<Table.Body {...$tableBodyAttrs}>
					{#each $pageRows as row (row.id)}
						<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
							<Table.Row {...rowAttrs}>
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										<Table.Cell {...attrs}>
											<Render of={cell.render()} />
										</Table.Cell>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
		<div class="flex items-center justify-end space-x-4 py-4">
			<Button
				variant="outline"
				size="sm"
				on:click={() => ($pageIndex = $pageIndex - 1)}
				disabled={!$hasPreviousPage}>Previous</Button
			>
			<Button
				variant="outline"
				size="sm"
				disabled={!$hasNextPage}
				on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
			>
		</div>
	{/await}
</div>
