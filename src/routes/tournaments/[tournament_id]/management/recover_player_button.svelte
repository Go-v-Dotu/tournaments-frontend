<script lang="ts">
	import timing from '$lib/timing';

	import Redo from 'lucide-svelte/icons/redo';

	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';

	export let height = 8;
	export let width = 8;

	export let onPlayerRecover: () => void;
</script>

<Tooltip.Root openDelay={timing.TooltipOpenDelay} closeDelay={timing.TooltipCloseDelay}>
	<Tooltip.Trigger asChild let:builder>
		<Button variant="ghost" class="rounded-full" builders={[builder]} on:click={onPlayerRecover}>
			<Redo class="mr-2h-{height} w-{width} hover:scale-105" />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content>Recover Player</Tooltip.Content>
</Tooltip.Root>
