<script lang="ts">
	import '../global.css';
	import '../app.css';

	import type { LayoutData } from './$types';

	import { ModeWatcher } from 'mode-watcher';

	import Header from './header.svelte';
	import Footer from './footer.svelte';

	export let data: LayoutData;
</script>

<ModeWatcher />

<div class="flex h-full flex-col">
	<Header username={data.user?.username} />
	<div class="flex flex-1 flex-col overflow-y-auto bg-muted/80">
		<slot />
		<div class="mt-auto">
			<Footer />
		</div>
	</div>
</div>
