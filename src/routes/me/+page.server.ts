import { StatusCodes } from 'http-status-codes';
import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

import tournamentManagementUseCases from '$lib/server/tournament_management';
import tournamentParticipationUseCases from '$lib/server/tournament_participation';

export const load = (async ({ locals }) => {
	if (locals.user === null) redirect(StatusCodes.SEE_OTHER, '/');
	const hostedTournamentPreviewsPromise = tournamentManagementUseCases.getAllHostedTournaments(
		locals.user.id
	);
	const participatedTournamentPreviewsPromise =
		tournamentParticipationUseCases.getAllParticipatedTournaments(locals.user.id);

	return {
		user: locals.user,
		participatedTournamentPreviewsPromise,
		hostedTournamentPreviewsPromise
	};
}) satisfies PageServerLoad;
