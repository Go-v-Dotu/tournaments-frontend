<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="container">
	<div class="my-4 flex items-center rounded-3xl border-b border-l-2 border-muted-foreground">
		<p class="my-2 p-4 text-center text-2xl leading-none md:text-6xl">
			{data.tournament.title}
		</p>
	</div>
	<slot />
</div>
