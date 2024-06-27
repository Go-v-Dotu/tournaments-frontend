import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

import { StatusCodes } from 'http-status-codes';

import tournamentManagementUseCases from '$lib/server/tournament_management';

export const load = (async ({ locals, params }) => {
	if (locals.user === null) redirect(StatusCodes.SEE_OTHER, '/');

	return {};
}) satisfies LayoutServerLoad;
