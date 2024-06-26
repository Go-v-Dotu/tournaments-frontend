import type { LayoutServerLoad } from './$types';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { hostTournamentFormSchema } from '$lib/forms/tournament';

export const load = (async ({ locals }) => {
	return {
		user: locals.user,
		hostTournamentForm: await superValidate(zod(hostTournamentFormSchema))
	};
}) satisfies LayoutServerLoad;
