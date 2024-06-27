import type { PageLoad } from './$types';

import type { Tournament } from 'domain/tournament';

import Card1 from '$lib/assets/images/cards/preview1.jpg';
import Card2 from '$lib/assets/images/cards/preview2.jpg';
import Card3 from '$lib/assets/images/cards/preview3.jpg';

export const load = (async ({ data }) => {
	const featuredTournaments: Tournament[] = [
		{
			id: 'a',
			title: 'Tournament 1',
			host: 'Host A',
			date: new Date(),
			previewUrl: Card1,
			status: ''
		},
		{
			id: 'b',
			title: 'Tournament 2',
			host: 'Host A',
			date: new Date(),
			previewUrl: Card2,
			status: ''
		},
		{
			id: 'c',
			title: 'Tournament 3',
			host: 'Host B',
			date: new Date(),
			previewUrl: Card3,
			status: ''
		}
	];

	const upcomingTournaments: Tournament[] = [
		{
			id: 'a',
			title: 'Tournament 1',
			host: 'Host A',
			date: new Date(),
			previewUrl: Card1,
			status: ''
		},
		{
			id: 'b',
			title: 'Tournament 2',
			host: 'Host A',
			date: new Date(),
			previewUrl: Card2,
			status: ''
		},
		{
			id: 'c',
			title: 'Tournament 3',
			host: 'Host B',
			date: new Date(),
			previewUrl: Card3,
			status: ''
		},
		{
			id: 'aa',
			title: 'Tournament 1',
			host: 'Host A',
			date: new Date(),
			previewUrl: Card1,
			status: ''
		},
		{
			id: 'bb',
			title: 'Tournament 2222222222222',
			host: 'Host A',
			date: new Date(),
			previewUrl: Card2,
			status: ''
		},
		{
			id: 'cc',
			title: 'Tournament 3',
			host: 'Host B',
			date: new Date(),
			previewUrl: Card3,
			status: ''
		}
	];

	return { featuredTournaments, upcomingTournaments, ...data };
}) satisfies PageLoad;
