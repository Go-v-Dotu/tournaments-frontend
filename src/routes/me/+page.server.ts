import { StatusCodes } from 'http-status-codes';
import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	if (locals.user === null) redirect(StatusCodes.SEE_OTHER, '/');

	return { user: locals.user };
}) satisfies PageServerLoad;
