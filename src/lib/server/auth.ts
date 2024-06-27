import { Lucia } from 'lucia';
import { dev } from '$app/environment';

import { adapter as prismaAdapter } from './prisma';

export const lucia = new Lucia(prismaAdapter, {
	sessionCookie: {
		attributes: {
			secure: dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username
		};
	}
});

interface DatabaseUserAttributes {
	id: string;
	username: string;
}

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}
