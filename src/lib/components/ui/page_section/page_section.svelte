<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<section class={cn('flex flex-col gap-2 py-2', className)} {...$$restProps}>
	<slot />
</section>
