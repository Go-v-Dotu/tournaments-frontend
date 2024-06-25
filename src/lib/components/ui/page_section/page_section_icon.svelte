<script lang="ts">
	import type { ComponentType } from 'svelte';

	import { cn } from '$lib/utils.js';

	import type { Icon } from 'lucide-svelte';

	export let icon: ComponentType<Icon>;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<svelte:component this={icon} class={cn('ml-12 size-20', className)} />
