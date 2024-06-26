import type { RequestHandler } from './$types';

import { error, redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';

import { lucia } from '$lib/server/auth';

export const POST: RequestHandler = async (event) => {
	if (!event.locals.session) {
		return error(StatusCodes.UNAUTHORIZED);
	}
	await lucia.invalidateSession(event.locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});

	throw redirect(StatusCodes.MOVED_TEMPORARILY, '/');
};
