<script lang="ts">
	import type { PageData } from './$types';

	import { Button } from '$lib/components/ui/button';

	import Cards from '$lib/icons/cards.svelte';

	export let data: PageData;
</script>

<div class="grid h-full w-full grid-cols-7 items-center">
	<div class=" col-span-3 col-start-2 mb-10 w-full flex-1 sm:w-8/12">
		<div class="container mx-auto h-full sm:p-10">
			<nav class="flex items-center justify-between px-4">
				<div class="text-4xl font-bold text-muted-foreground">
					{data.tournament.date.toDateString()}
				</div>
			</nav>
			<div class="my-4 mr-20 w-full border-t border-destructive shadow-2xl"></div>
			<header class="container mt-10 h-full items-center px-4 lg:mt-0 lg:flex">
				<div class="flex w-full flex-col">
					<h1 class="text-balance text-4xl font-bold lg:text-6xl">
						{data.tournament.title}
					</h1>
					<p class="my-10 text-xl">
						Here lies the most captivating description you'll ever encounter.
					</p>
					<Button class="text-3xl">Join</Button>
				</div>
			</header>
		</div>
	</div>
	<div
		class="col-span-2 flex h-full flex-1 flex-col items-center justify-center border-r-2 bg-background/50"
	>
		<Cards size={400} />
	</div>
	<div class="col-span-1 self-stretch bg-background/45" />
</div>
