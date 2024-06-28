<script lang="ts">
	import { scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	import { MoonStar, Sun } from 'lucide-svelte';

	import { mode, toggleMode } from 'mode-watcher';

	import { Button } from '$lib/components/ui/button';
</script>

<Button
	on:click={toggleMode}
	role="switch"
	aria-label="Light Switch"
	aria-checked={$mode === 'light'}
	variant="ghost"
	class="rounded-input hover:bg-dark-10 relative inline-flex h-10 w-10 items-center justify-center px-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
>
	{#if $mode === 'light'}
		<div
			class="absolute inline-flex h-full w-full items-center justify-center"
			transition:scale={{ delay: 50, duration: 200, start: 0.7, easing: cubicOut }}
		>
			<MoonStar class="size-5" aria-label="Moon" />
		</div>
	{:else}
		<div
			class="absolute inline-flex h-full w-full items-center justify-center"
			transition:scale={{ delay: 50, duration: 200, start: 0.7, easing: cubicOut }}
		>
			<Sun class="size-5" aria-label="Sun" />
		</div>
	{/if}
</Button>
