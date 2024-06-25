<script lang="ts">
	import { cn } from '$lib/utils.js';

	export let balanced = true;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<p
	class={cn('text-sm text-muted-foreground sm:text-base', balanced && 'text-balance', className)}
	{...$$restProps}
>
	<slot />
</p>
