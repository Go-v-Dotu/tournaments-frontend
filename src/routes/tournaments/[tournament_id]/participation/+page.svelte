<script lang="ts">
	import type { PageData } from './$types';
	import PlayerStatusTag from '$lib/components/player_status_tag.svelte';

	import * as Table from '$lib/components/ui/table/index.js';

	export let data: PageData;
</script>

<div class="container">
	<Table.Root>
		<Table.Caption>A list of enrolled players.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head>Username</Table.Head>
				<Table.Head class="w-[100px]">Status</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.players as player (player.playerId)}
				<Table.Row>
					<Table.Cell class="font-medium">{player.username}</Table.Cell>
					<Table.Cell>
						<PlayerStatusTag status={player.dropped ? 'dropped' : 'enrolled'} />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
