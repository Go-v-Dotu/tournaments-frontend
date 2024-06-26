<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="container flex-1">
	<slot />
</div>
