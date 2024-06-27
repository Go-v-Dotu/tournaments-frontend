import { env } from '$env/dynamic/private';

import { ContentType, HTTPMethod } from '$lib/constants';

import type { UserPublic } from 'domain/user';

import { createUserSchemaController, type CreateUserSchema } from './controllers/user';

// This one must be an event, but for now as a workaround for hack-a-ton, this is a call for endpoint for data sync

class UseCases {
	constructor(
		private readonly apiAddress: string,
		private readonly apiEndpointPrefix: string,
		private readonly apiVersion: string,
		// This one must be a queue, but for now as a placeholder an endpoint which is served from existing service
		private readonly resourceName: string = 'tournaments'
	) {}

	createUser = async (userPublic: UserPublic) => {
		const createUserSchema: CreateUserSchema = { ...userPublic };

		const endpoint = `${this.endpointBase}/users`;
		const response = await fetch(endpoint, {
			method: HTTPMethod.POST,
			headers: {
				'content-type': ContentType.APPLICATION_JSON
			},
			body: JSON.stringify(createUserSchema)
		});

		const responseResultJson = await response.json();
		await createUserSchemaController.parseAsync(responseResultJson);
	};

	private get endpointBase(): string {
		return `http://${this.apiAddress}/${this.apiEndpointPrefix}/${this.apiVersion}`;
	}
}

export default new UseCases(env.TOURNAMENT_MANAGEMENT_SERVICE, 'api', 'v1');
