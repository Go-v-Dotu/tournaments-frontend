<script lang="ts">
	import '../global.css';
	import '../app.css';

	import { ModeWatcher } from 'mode-watcher';

	import Header from './header.svelte';
	import Footer from './footer.svelte';
</script>

<ModeWatcher />

<div class="flex h-full flex-col">
	<Header />
	<div class="flex flex-1 flex-col overflow-y-auto bg-muted/80">
		<slot />
		<div class="mt-auto">
			<Footer />
		</div>
	</div>
</div>
