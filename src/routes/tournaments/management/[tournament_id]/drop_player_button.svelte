<script lang="ts">
	import timing from '$lib/timing';

	import CircleX from 'lucide-svelte/icons/circle-x';

	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';

	export let height = 8;
	export let width = 8;

	export let onPlayerDrop: () => void;
	export let hidden: boolean = false;
</script>

<div class={hidden ? 'collapse' : ''}>
	<Tooltip.Root openDelay={timing.TooltipOpenDelay} closeDelay={timing.TooltipCloseDelay}>
		<Tooltip.Trigger asChild let:builder>
			<Button variant="ghost" class="rounded-full" builders={[builder]} on:click={onPlayerDrop}>
				<CircleX class="mr-2h-{height} w-{width} hover:scale-105" />
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content>Drop Player</Tooltip.Content>
	</Tooltip.Root>
</div>
