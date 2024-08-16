<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';

	import type { PageData } from './$types';

	import UserPic1 from '$lib/assets/images/cards/userpic1.png';
	import UserPic2 from '$lib/assets/images/cards/userpic2.jpg';
	import UserPic3 from '$lib/assets/images/cards/userpic3.png';
	import UserPic4 from '$lib/assets/images/cards/userpic4.jpg';

	import Overview from './overview.svelte';
	import Organization from './organization.svelte';
	import Participation from './participation.svelte';

	export let data: PageData;

	const enum TabValue {
		Overview = 'overview',
		Participation = 'participation',
		Organization = 'organization',
		Analytics = 'analytics'
	}
</script>

<Tabs.Root value={TabValue.Overview} class="flex h-full flex-col space-y-4 p-8 pt-6">
	<div class="mb-4 flex flex-col items-start gap-4">
		<div class="h-full">
			<div class="grid h-full grid-cols-3 items-center gap-2">
				<div class=" relative aspect-square flex-1 self-center overflow-hidden rounded-md">
					<img
						src={[UserPic1, UserPic2, UserPic3, UserPic4][Math.floor(Math.random() * 4)]}
						class="absolute h-full object-cover"
						alt="avatar"
					/>
				</div>
				<p class="col-span-2 self-end text-5xl leading-[1] text-muted-foreground">
					{data.user.username}
				</p>
			</div>
		</div>
		<Tabs.List>
			<Tabs.Trigger value={TabValue.Overview}>Overview</Tabs.Trigger>
			<Tabs.Trigger value={TabValue.Participation}>Participation</Tabs.Trigger>
			<Tabs.Trigger value={TabValue.Organization}>Organization</Tabs.Trigger>
			<Tabs.Trigger value={TabValue.Analytics} disabled>Analytics</Tabs.Trigger>
		</Tabs.List>
	</div>

	<Tabs.Content value={TabValue.Overview}>
		<Overview />
	</Tabs.Content>
	<Tabs.Content value={TabValue.Participation}>
		<Participation
			participatedTournamentPreviewsPromise={data.participatedTournamentPreviewsPromise}
		/>
	</Tabs.Content>
	<Tabs.Content value={TabValue.Organization}>
		<Organization hostedTournamentPreviewsPromise={data.hostedTournamentPreviewsPromise} />
	</Tabs.Content>
</Tabs.Root>
