<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Separator } from '$lib/components/ui/separator';

	import Trophy from 'lucide-svelte/icons/trophy';
	import CalendarCheck from 'lucide-svelte/icons/clipboard-pen-line';
	import ClipboardCheck from 'lucide-svelte/icons/clipboard-check';
	import BookHeart from 'lucide-svelte/icons/book-heart';
	import BarChart from 'lucide-svelte/icons/bar-chart-2';

	import type { PageData } from './$types';

	import FavouriteCard from '$lib/assets/images/cards/favourite_card.png';
	import UserPic from '$lib/assets/images/cards/userpic.jpg';

	import Overview from './overview.svelte';

	export let data: PageData;
</script>

<Tabs.Root value="overview" class="flex h-full flex-col space-y-4 p-8 pt-6">
	<div class="flex flex-col items-start gap-4">
		<div class="h-full">
			<div class="grid h-full grid-cols-3 items-center">
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
			<Tabs.Trigger value="Events" disabled>Events</Tabs.Trigger>
		</Tabs.List>
	</div>

	<Tabs.Content value="overview" class="space-y-4">
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="border-b text-sm font-medium ">Events Participated</Card.Title>
					<ClipboardCheck />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">35</div>
					<p class="text-xs text-muted-foreground">+10 from last month</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header class="s flex flex-row justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Events Organized</Card.Title>
					<CalendarCheck />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">12</div>
					<p class="text-xs text-muted-foreground">+3 from last month</p>
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header class="flex flex-row justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Win Rate</Card.Title>
					<Trophy />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">58%</div>
					<p class="text-xs text-muted-foreground">+5% from last month</p>
				</Card.Content>
			</Card.Root>
		</div>

		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
			<Card.Root class="lg:col-span-4">
				<Card.Header class="flex flex-row justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Overview</Card.Title>
					<BarChart />
				</Card.Header>
				<Card.Content>
					<Overview />
				</Card.Content>
			</Card.Root>
			<Card.Root class="flex flex-col">
				<Card.Header class=" flex flex-row justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Favourite Card</Card.Title>
					<BookHeart />
				</Card.Header>
				<Card.Content class="flex flex-1 items-center">
					<div class="flex-1">
						<img src={FavouriteCard} alt="favourite card" />
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</Tabs.Content>
</Tabs.Root>
