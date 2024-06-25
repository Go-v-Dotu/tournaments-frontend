<script lang="ts">
	import '../global.css';
	import '../app.css';

	import { ModeWatcher } from 'mode-watcher';

	import Navbar from './navbar.svelte';
</script>

<ModeWatcher />

<div class="flex h-full flex-col">
	<Navbar />
	<div class="flex-1 overflow-auto bg-muted/80">
		<slot />
	</div>
</div>
