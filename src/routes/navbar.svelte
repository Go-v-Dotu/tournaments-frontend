<script lang="ts">
	import LightSwitch from '$lib/components/light_switch.svelte';
</script>

<div
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container">
		<nav class="flex w-full justify-between">
			<div class="flex h-full flex-1 items-center md:gap-1 lg:gap-2">
				<a href="/" aria-current="page" aria-label="tournaments" class="btn px-4">
					<p class="text-4xl font-extrabold leading-3 tracking-tight md:text-2xl lg:text-4xl">
						Tournaments
					</p>
				</a>
			</div>
			<div class="mr-4 flex items-center">
				<LightSwitch />
			</div>
		</nav>
	</div>
</div>
