<script lang="ts">
	import { cn } from '$lib/utils';

	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import Users from 'lucide-svelte/icons/users';
	import * as Card from '$lib/components/ui/card';

	import type { Tournament } from 'domain/tournaments';

	export let tournament: Tournament;

	export let aspectRatio: 'portrait' | 'square' = 'square';

	const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};
	const locale: Intl.LocalesArgument = 'en-US';
</script>

<a href="/" class="z-0 space-y-3 rounded-3xl bg-card shadow-sm transition-all hover:scale-105">
	<Card.Root>
		<Card.Content class="p-0">
			<div class="overflow-hidden rounded-t-md">
				<img
					class={cn('object-cover', aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square')}
					src={tournament.previewUrl}
					alt={tournament.title}
				/>
			</div>
		</Card.Content>
		<Card.Header>
			<Card.Title class="truncate">{tournament.title}</Card.Title>
			<Card.Description class="flex flex-col gap-2 truncate">
				<div class="flex gap-2">
					<CalendarDays class="size-5" />
					<p>
						{tournament.createdAt.toLocaleString(locale, dateTimeFormatOptions)}
					</p>
				</div>
				<div class="flex gap-2">
					<Users class="size-5" />
					<p>
						{Math.ceil(Math.random() * 100) % 10} registered
					</p>
				</div>
			</Card.Description>
		</Card.Header>
		<Card.Footer class="">
			<p>
				Hosted by <span class="italic">{tournament.host}</span>
			</p>
		</Card.Footer>
	</Card.Root>
</a>
