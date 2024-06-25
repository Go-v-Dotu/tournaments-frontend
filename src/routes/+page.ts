import type { PageLoad } from './$types';

import type { Tournament } from 'domain/tournaments';

import Card1 from '$lib/assets/images/cards/pic1.jpg';
import Card2 from '$lib/assets/images/cards/pic2.jpg';
import Card3 from '$lib/assets/images/cards/pic3.jpg';

export const load = (async () => {
	const upcomingTournaments: Tournament[] = [
		{
			id: 'a',
			title: 'Tournament 1',
			host: 'Host A',
			createdAt: new Date(),
			previewUrl: Card1,
			status: ''
		},
		{
			id: 'b',
			title: 'Tournament 2',
			host: 'Host A',
			createdAt: new Date(),
			previewUrl: Card2,
			status: ''
		},
		{
			id: 'c',
			title: 'Tournament 3',
			host: 'Host B',
			createdAt: new Date(),
			previewUrl: Card3,
			status: ''
		}
	];
	return { upcomingTournaments };
}) satisfies PageLoad;
