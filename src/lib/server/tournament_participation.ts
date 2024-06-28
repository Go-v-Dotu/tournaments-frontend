import { env } from '$env/dynamic/private';

import { HTTPMethod } from '$lib/constants';
import { generatePreviewUrl } from '$lib/utils';

import type {
	TournamentPreview,
	TournamentId,
	Tournament,
	Player
} from 'domain/tournament_participation';
import type { UserId } from 'domain/user';

import {
	getTournamentByIdSchemaController,
	type GetTournamentByIdSchemaController,
	getAllTournamentPreviewsSchemaController,
	type GetAllTournamentPreviewsSchemaController,
	getAllPlayersSchemaController,
	type GetAllPlayersSchemaController
} from './controllers/tournament_participation';

class UseCases {
	constructor(
		private readonly apiAddress: string,
		private readonly apiEndpointPrefix: string,
		private readonly apiVersion: string,
		private readonly resourceName: string = 'tournaments'
	) {}

	getTournamentById = async (
		userId: UserId | undefined,
		tournamentId: TournamentId
	): Promise<Tournament> => {
		let responseResult: GetTournamentByIdSchemaController | undefined = undefined;

		const endpoint = `${this.endpointBase}/${this.resourceName}/${tournamentId}`;
		const response = await fetch(endpoint, {
			method: HTTPMethod.GET,
			headers: { ...(userId ? this.constructAuthorizationHeader(userId) : {}) }
		});

		const responseResultJson = await response.json();
		responseResult = await getTournamentByIdSchemaController.parseAsync(responseResultJson);

		return {
			...responseResult.tournament,
			host: { ...responseResult.tournament.host, userId: responseResult.tournament.host.user_id },
			totalPlayers: responseResult.tournament.total_players
		};
	};

	getAllTournaments = async (): Promise<TournamentPreview[]> => {
		let responseResult: GetAllTournamentPreviewsSchemaController | undefined = undefined;

		const endpoint = `${this.endpointBase}/${this.resourceName}`;
		const response = await fetch(endpoint, {
			method: HTTPMethod.GET
		});

		const responseResultJson = await response.json();
		responseResult = await getAllTournamentPreviewsSchemaController.parseAsync(responseResultJson);

		return responseResult.tournaments.map((v) => ({
			...v,
			host: { ...v.host, userId: v.host.user_id },
			totalPlayers: v.total_players,
			previewUrl: generatePreviewUrl(v.id)
		}));
	};

	getAllParticipatedTournaments = async (userId: string): Promise<TournamentPreview[]> => {
		let responseResult: GetAllTournamentPreviewsSchemaController | undefined = undefined;

		const endpoint = `${this.endpointBase}/user/${this.resourceName}`;
		const response = await fetch(endpoint, {
			method: HTTPMethod.GET,
			headers: { ...this.constructAuthorizationHeader(userId) }
		});

		const responseResultJson = await response.json();
		responseResult = await getAllTournamentPreviewsSchemaController.parseAsync(responseResultJson);

		return responseResult.tournaments.map((v) => ({
			...v,
			host: { ...v.host, userId: v.host.user_id },
			totalPlayers: v.total_players,
			previewUrl: generatePreviewUrl(v.id)
		}));
	};

	getAllPlayers = async (userId: UserId, tournamentId: TournamentId): Promise<Player[]> => {
		let responseResult: GetAllPlayersSchemaController | undefined = undefined;

		const endpoint = `${this.endpointBase}/${this.resourceName}/${tournamentId}/players`;
		const response = await fetch(endpoint, {
			method: HTTPMethod.GET,
			headers: { ...this.constructAuthorizationHeader(userId) }
		});

		const responseResultJson = await response.json();
		responseResult = await getAllPlayersSchemaController.parseAsync(responseResultJson);

		return responseResult.players.map((v) => ({
			...v,
			userId: v.user_id || undefined,
			playerId: v.id
		}));
	};

	private get endpointBase(): string {
		return `http://${this.apiAddress}/${this.apiEndpointPrefix}/${this.apiVersion}`;
	}

	private constructAuthorizationHeader = (userId: string) => {
		return { Authorization: userId };
	};
}

export default new UseCases(env.TOURNAMENT_PARTICIPATION_SERVICE, 'api', 'v1');
