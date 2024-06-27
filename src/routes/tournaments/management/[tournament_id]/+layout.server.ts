import type { LayoutServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';

import tournamentManagementUseCases from '$lib/server/tournament_management';

export const load = (async ({ locals, params }) => {
	if (locals.user === null) redirect(StatusCodes.SEE_OTHER, '/');

	const tournament = await tournamentManagementUseCases.getTournamentById(
		locals.user.id,
		params.tournament_id
	);

	const playersPromise = tournamentManagementUseCases.getAllPlayers(
		locals.user.id,
		params.tournament_id
	);

	return { tournament, playersPromise };
}) satisfies LayoutServerLoad;
