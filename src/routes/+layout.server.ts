import type { LayoutServerLoad } from './$types';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { hostTournamentFormSchema } from '$lib/forms/tournament_management';

export const load = (async ({ locals }) => {
	return {
		username: locals.user?.username,
		hostTournamentForm: await superValidate(zod(hostTournamentFormSchema))
	};
}) satisfies LayoutServerLoad;
