<script lang="ts">
	import { cn } from '$lib/utils';

	import CalendarDays from 'lucide-svelte/icons/calendar-days';

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

<a href="/" class="z-0 space-y-3 bg-card shadow-sm transition-all hover:scale-105">
	<Card.Root>
		<Card.Content class="p-0">
			<div class="overflow-hidden">
				<img
					class={cn('object-cover', aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square')}
					src={tournament.previewUrl}
					alt={tournament.title}
				/>
			</div>
		</Card.Content>
		<Card.Header>
			<Card.Title class="truncate">{tournament.title}</Card.Title>
			<Card.Description class="truncate">
				<div class="flex gap-2">
					<CalendarDays class="size-5" />
					<p>
						{tournament.createdAt.toLocaleString(locale, dateTimeFormatOptions)}
					</p>
				</div>
			</Card.Description>
		</Card.Header>
		<Card.Footer>
			<p>
				Hosted by <span class="font-semibold">{tournament.host}</span>
			</p>
		</Card.Footer>
	</Card.Root>
</a>
