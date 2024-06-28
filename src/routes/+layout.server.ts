import type { LayoutServerLoad } from './$types';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { hostTournamentFormSchema } from '$lib/forms/tournament_management';
import { signUpFormSchema, signInFormSchema } from '$lib/forms/auth';

export const load = (async ({ locals }) => {
	return {
		username: locals.user?.username,
		hostTournamentForm: await superValidate(zod(hostTournamentFormSchema)),
		signUpForm: await superValidate(zod(signUpFormSchema)),
		signInForm: await superValidate(zod(signInFormSchema))
	};
}) satisfies LayoutServerLoad;
