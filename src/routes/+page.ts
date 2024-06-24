import type { PageLoad } from './$types';

import type { TournamentId } from 'domain/tournaments';

export const load = (async () => {
	const upcomingTournaments: TournamentId[] = [];
	return { upcomingTournaments };
}) satisfies PageLoad;
