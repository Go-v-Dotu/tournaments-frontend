<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h1
	class={cn(
		'text-1xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-none',
		className
	)}
	{...$$restProps}
>
	<slot />
</h1>
