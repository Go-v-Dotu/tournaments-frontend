<script lang="ts">
	import { cn } from '$lib/utils';

	import * as Card from '$lib/components/ui/card';

	import type { Tournament } from 'domain/tournaments';

	export let tournament: Tournament;

	export let width: number;
	export let height: number;
	export let aspectRatio: 'portrait' | 'square' = 'square';
</script>

<a href="/" class="space-y-3 bg-card shadow-sm transition-all hover:scale-105">
	<Card.Root>
		<Card.Content class="p-0">
			<div class="overflow-hidden">
				<img
					class={cn(
						'h-auto w-auto object-cover  ',
						aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
					)}
					src={tournament.previewUrl}
					alt={tournament.title}
					{width}
					{height}
				/>
			</div>
		</Card.Content>
		<Card.Header>
			<Card.Title>{tournament.title}</Card.Title>
			<Card.Description>{tournament.host}</Card.Description>
		</Card.Header>
		<Card.Footer>
			<p>{tournament.createdAt.toLocaleDateString()}</p>
		</Card.Footer>
	</Card.Root>
</a>
