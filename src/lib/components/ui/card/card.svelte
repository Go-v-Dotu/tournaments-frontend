<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div
	class={cn(
		'rounded-lg border border-secondary-foreground/65 bg-card text-card-foreground shadow-sm',
		className
	)}
	{...$$restProps}
>
	<slot />
</div>
