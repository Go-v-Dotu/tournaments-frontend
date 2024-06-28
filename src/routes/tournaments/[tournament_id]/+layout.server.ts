import type { LayoutServerLoad } from './$types';

import tournamentParticipationUseCases from '$lib/server/tournament_participation';

export const load = (async ({ locals, params }) => {
	const tournament = await tournamentParticipationUseCases.getTournamentById(
		locals.user?.id,
		params.tournament_id
	);

	return { tournament };
}) satisfies LayoutServerLoad;
