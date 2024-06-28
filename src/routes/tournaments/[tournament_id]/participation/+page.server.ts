import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';

import tournamentParticipationUseCases from '$lib/server/tournament_participation';

export const load = (async ({ locals, params }) => {
	if (locals.user === null) redirect(StatusCodes.SEE_OTHER, '/');

	const players = await tournamentParticipationUseCases.getAllPlayers(
		locals.user.id,
		params.tournament_id
	);
	return { players };
}) satisfies PageServerLoad;
