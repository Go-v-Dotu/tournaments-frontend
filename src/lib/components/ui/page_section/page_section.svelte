<script lang="ts">
	import type { ComponentType } from 'svelte';

	import { cn } from '$lib/utils.js';

	import type { Icon } from 'lucide-svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let icon: ComponentType<Icon>;
</script>

<div class={cn('flex items-center', className)} {...$$restProps}>
	<svelte:component this={icon} class="size-20 py-4" />
	<section class="flex flex-col gap-2 py-2">
		<slot />
	</section>
</div>
