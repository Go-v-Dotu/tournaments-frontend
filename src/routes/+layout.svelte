<script lang="ts">
	import '../global.css';
	import '../app.css';

	import type { LayoutData } from './$types';

	import { ModeWatcher } from 'mode-watcher';

	import Header from './header.svelte';
	import Footer from './footer.svelte';

	import { page } from '$app/stores';

	export let data: LayoutData;
</script>

<ModeWatcher />

<div class="flex h-full flex-col">
	<Header
		username={data.username}
		hostTournamentForm={data.hostTournamentForm}
		showHostTournamentButton={$page.url.pathname !== '/' && data.username !== undefined}
	/>
	<div class="flex flex-1 flex-col overflow-y-auto bg-muted/80">
		<slot />
		<div class="mt-auto">
			<Footer />
		</div>
	</div>
</div>
