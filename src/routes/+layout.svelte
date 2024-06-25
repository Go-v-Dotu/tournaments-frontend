<script lang="ts">
	import '../global.css';
	import '../app.css';

	import { ModeWatcher } from 'mode-watcher';

	import Header from './header.svelte';
	import Footer from './footer.svelte';
</script>

<ModeWatcher />

<div class="flex h-full flex-col bg-muted/80">
	<Header />
	<div class="flex-1 overflow-auto">
		<slot />
		<Footer />
	</div>
</div>
