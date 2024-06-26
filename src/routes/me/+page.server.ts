import { StatusCodes } from 'http-status-codes';
import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

import tournamentManagementUseCases from '$lib/server/tournament_management';

export const load = (async ({ locals }) => {
	if (locals.user === null) redirect(StatusCodes.SEE_OTHER, '/');

	const hosted_tournaments = await tournamentManagementUseCases.getAll();
	console.log('🚀 ~ load ~ hosted_tournaments:', hosted_tournaments);

	return { user: locals.user };
}) satisfies PageServerLoad;
