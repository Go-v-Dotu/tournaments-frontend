<script lang="ts">
	import Bar from '$lib/components/bar.svelte';
	import * as Card from '$lib/components/ui/card';

	import Trophy from 'lucide-svelte/icons/trophy';
	import CalendarCheck from 'lucide-svelte/icons/clipboard-pen-line';
	import ClipboardCheck from 'lucide-svelte/icons/clipboard-check';
	import BookHeart from 'lucide-svelte/icons/book-heart';
	import BarChart from 'lucide-svelte/icons/chart-column';

	import FavouriteCard from '$lib/assets/images/cards/favourite_card.png';
</script>

<div class="space-y-4">
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
				<Bar />
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
</div>
