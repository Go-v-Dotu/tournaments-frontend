import { env } from '$env/dynamic/private';

import { HTTPMethod } from '$lib/constants';

import type { TournamentDate, TournamentPreview, TournamentTitle } from 'domain/tournaments';

import {
	getAllTournamentPreviewsSchemaController,
	type GetAllTournamentPreviewsSchemaController,
	type HostTournamentSchema,
	hostTournamentSchemaController
} from './controllers/tournament_management';

class UseCases {
	constructor(
		private readonly apiAddress: string,
		private readonly apiEndpointPrefix: string,
		private readonly apiVersion: string,
		private readonly resourceName: string = 'tournaments'
	) {}

	hostTournament = async (
		hostId: string,
		title: TournamentTitle,
		date: TournamentDate
	): Promise<void> => {
		const hostTournamentSchema: HostTournamentSchema = { title, date: date.toISOString() };

		const response = await fetch(this.getEndpointBase(), {
			method: HTTPMethod.POST,
			headers: {},
			body: JSON.stringify(hostTournamentSchema)
		});

		const responseResultJson = await response.json();
		await hostTournamentSchemaController.parseAsync(responseResultJson);
	};

	getAll = async (userId: string): Promise<TournamentPreview[]> => {
		let responseResult: GetAllTournamentPreviewsSchemaController | undefined = undefined;

		const response = await fetch(this.getEndpointBase({ perUser: true }), {
			method: HTTPMethod.GET,
			headers: { ...this.constructAuthorizationHeader(userId) }
		});

		const responseResultJson = await response.json();
		responseResult = await getAllTournamentPreviewsSchemaController.parseAsync(responseResultJson);

		return responseResult.tournaments;
	};

	private getEndpointBase = ({ perUser }: { perUser: boolean } = { perUser: false }): string => {
		return `http://${this.apiAddress}/${this.apiEndpointPrefix}/${this.apiVersion}/${perUser ? 'user/' : ''}${this.resourceName}`;
	};

	private constructAuthorizationHeader = (userId: string) => {
		return { Authorization: userId };
	};
}

export default new UseCases(env.TOURNAMENT_MANAGEMENT_SERVICE, 'api', 'v1');
