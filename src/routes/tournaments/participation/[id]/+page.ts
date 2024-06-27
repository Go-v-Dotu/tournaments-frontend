import type { PageLoad } from './$types';

import type { Tournament } from 'domain/tournament_participation';

export const load = (async () => {
	const tournament: Tournament = {
		id: '1',
		date: new Date(),
		host: 'Vyacheslav',
		title: 'The Great Tournament',
		totalPlayers: 14
	};
	return { tournament };
}) satisfies PageLoad;
