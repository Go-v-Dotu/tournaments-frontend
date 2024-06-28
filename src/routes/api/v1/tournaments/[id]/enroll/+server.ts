import type { RequestHandler } from './$types';

import { redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';

import tournamentManagementUseCases from '$lib/server/tournament_management';

export const POST: RequestHandler = async ({ locals, params }) => {
	if (locals.user === null) redirect(StatusCodes.SEE_OTHER, '/');

	await tournamentManagementUseCases.addPlayer(locals.user.id, params.id);

	return new Response();
};
