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

<div
	class="fixed left-0 top-0 z-[99] m-8 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 p-3 font-mono text-xs text-white sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500"
>
	<div class="block sm:hidden md:hidden lg:hidden xl:hidden">al</div>
	<div class="hidden sm:block md:hidden lg:hidden xl:hidden">sm</div>
	<div class="hidden sm:hidden md:block lg:hidden xl:hidden">md</div>
	<div class="hidden sm:hidden md:hidden lg:block xl:hidden">lg</div>
	<div class="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">xl</div>
	<div class="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">2xl</div>
</div>

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
