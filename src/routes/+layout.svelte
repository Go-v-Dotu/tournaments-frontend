<script lang="ts">
	import '../global.css';
	import '../app.css';

	import { ModeWatcher } from 'mode-watcher';

	import Navbar from './navbar.svelte';
</script>

<ModeWatcher />

<div class="h-full">
	<!-- <Navbar /> -->

	<slot />
</div>
