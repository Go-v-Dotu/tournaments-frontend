import type { Actions, PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';

import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { addGuestPlayerFormSchema } from '$lib/forms/tournament_management';

import tournamentManagementUseCases from '$lib/server/tournament_management';

export const load = (async ({ locals }) => {
	if (locals.user === null) redirect(StatusCodes.SEE_OTHER, '/');

	return {
		addGuestPlayerForm: await superValidate(zod(addGuestPlayerFormSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	addGuestPlayer: async (event) => {
		if (event.locals.user === null) redirect(StatusCodes.SEE_OTHER, '/');

		const form = await superValidate(event, zod(addGuestPlayerFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const id = await tournamentManagementUseCases.addGuestPlayer(
			event.locals.user.id,
			event.params.tournament_id,
			form.data.username
		);

		return { form, playerId: id };
	}
};
