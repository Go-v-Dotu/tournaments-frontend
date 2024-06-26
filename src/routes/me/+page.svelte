<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';

	import type { PageData } from './$types';

	import UserPic from '$lib/assets/images/cards/userpic.jpg';

	import Overview from './overview.svelte';
	import Organization from './organization.svelte';
	import Participation from './participation.svelte';

	export let data: PageData;
</script>

<div class="container">
	<Tabs.Root value="overview" class="flex h-full flex-col space-y-4 p-8 pt-6">
		<div class="mb-4 flex flex-col items-start gap-4">
			<div class="h-full">
				<div class="grid h-full grid-cols-3 items-center gap-2">
					<div class=" relative aspect-square flex-1 self-center overflow-hidden rounded-md">
						<img src={UserPic} class="absolute h-full w-full object-cover" alt="avatar" />
					</div>
					<p class="col-span-2 self-end text-5xl leading-[1] text-muted-foreground">
						{data.user.username}
					</p>
				</div>
			</div>
			<Tabs.List>
				<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
				<Tabs.Trigger value="participation">Participation</Tabs.Trigger>
				<Tabs.Trigger value="organization">Organization</Tabs.Trigger>
				<Tabs.Trigger value="analytics" disabled>Analytics</Tabs.Trigger>
			</Tabs.List>
		</div>

		<Tabs.Content value="overview">
			<Overview />
		</Tabs.Content>
		<Tabs.Content value="participation">
			<Participation />
		</Tabs.Content>
		<Tabs.Content value="organization">
			<Organization />
		</Tabs.Content>
	</Tabs.Root>
</div>
