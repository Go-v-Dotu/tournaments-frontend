<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<section
	class={cn('mx-auto flex flex-col items-center gap-2 py-4 md:py-8 lg:py-12', className)}
	{...$$restProps}
>
	<slot />
</section>
