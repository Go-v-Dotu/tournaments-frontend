import type { Actions, PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

import { StatusCodes } from 'http-status-codes';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';

import { prisma } from '$lib/server/prisma';
import { lucia } from '$lib/server/auth';
import { signUpFormSchema } from '$lib/forms/auth';

export const load = (async ({ locals }) => {
	return { user: locals.user, signUpForm: await superValidate(zod(signUpFormSchema)) };
}) satisfies PageServerLoad;

export const actions: Actions = {
	signUp: async (event) => {
		const form = await superValidate(event, zod(signUpFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		if (
			await prisma.user.findUnique({
				where: { username: form.data.username }
			})
		) {
			return setError(form, 'username', 'Username is taken');
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await hash(form.data.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		await prisma.user.create({
			data: {
				id: userId,
				username: form.data.username,
				password_hash: passwordHash
			}
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(StatusCodes.MOVED_PERMANENTLY, '/');
	}
};
