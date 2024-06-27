import { env } from '$env/dynamic/private';

import { ContentType, HTTPMethod } from '$lib/constants';

import type {
	TournamentPreview,
	TournamentTitle,
	TournamentId,
	Player,
	Tournament,
	PlayerId
} from 'domain/tournament_management';

import type { UserId, Username } from 'domain/user';

import {
	getAllPlayersSchemaController,
	type GetAllPlayersSchemaController,
	getTournamentByIdSchemaController,
	type GetTournamentByIdSchemaController,
	getAllTournamentPreviewsSchemaController,
	type GetAllTournamentPreviewsSchemaController,
	type HostTournamentSchema,
	hostTournamentSchemaController,
	type AddGuestPlayerSchema,
	addGuestPlayerSchemaController
} from './controllers/tournament_management';

import preview1 from '$lib/assets/images/cards/preview1.jpg';
import preview2 from '$lib/assets/images/cards/preview2.jpg';
import preview3 from '$lib/assets/images/cards/preview3.jpg';

import { getLocalTimeZone, parseDate } from '@internationalized/date';

const availablePreviews: string[] = [preview1, preview2, preview3];

class UseCases {
	constructor(
		private readonly apiAddress: string,
		private readonly apiEndpointPrefix: string,
		private readonly apiVersion: string,
		private readonly resourceName: string = 'tournaments'
	) {}

	hostTournament = async (
		userId: UserId,
		title: TournamentTitle,
		iso_date: string
	): Promise<TournamentId> => {
		const hostTournament: HostTournamentSchema = {
			title,
			date: parseDate(iso_date).toDate(getLocalTimeZone()).toISOString()
		};

		const endpoint = `${this.endpointBase}/${this.resourceName}`;
		const response = await fetch(endpoint, {
			method: HTTPMethod.POST,
			headers: {
				...this.constructAuthorizationHeader(userId),
				'content-type': ContentType.APPLICATION_JSON
			},
			body: JSON.stringify(hostTournament)
		});

		const responseResultJson = await response.json();
		const hostTournamentResult =
			await hostTournamentSchemaController.parseAsync(responseResultJson);

		return hostTournamentResult.id;
	};

	getTournamentById = async (userId: UserId, tournamentId: TournamentId): Promise<Tournament> => {
		let responseResult: GetTournamentByIdSchemaController | undefined = undefined;

		const endpoint = `${this.endpointBase}/${this.resourceName}/${tournamentId}`;
		const response = await fetch(endpoint, {
			method: HTTPMethod.GET,
			headers: { ...this.constructAuthorizationHeader(userId) }
		});

		const responseResultJson = await response.json();
		responseResult = await getTournamentByIdSchemaController.parseAsync(responseResultJson);

		return responseResult.tournament;
	};

	getAllTournaments = async (userId: string): Promise<TournamentPreview[]> => {
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
			totalPlayers: v.total_players,
			previewUrl: this.generatePreviewUrl(v.id)
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

	addGuestPlayer = async (
		userId: UserId,
		tournamentId: TournamentId,
		username: Username
	): Promise<PlayerId> => {
		const addGuestPlayer: AddGuestPlayerSchema = { username };

		const endpoint = `${this.endpointBase}/${this.resourceName}/${tournamentId}/players`;
		const response = await fetch(endpoint, {
			method: HTTPMethod.POST,
			headers: {
				...this.constructAuthorizationHeader(userId),
				'content-type': ContentType.APPLICATION_JSON
			},
			body: JSON.stringify(addGuestPlayer)
		});

		const responseResultJson = await response.json();
		const addGuestPlayerResult =
			await addGuestPlayerSchemaController.parseAsync(responseResultJson);

		return addGuestPlayerResult.id;
	};

	private generatePreviewUrl = (id: string) => {
		let hash = 0;
		for (let i = 0; i < id.length; i++) {
			const char = id.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash |= 0; // Convert to 32bit integer
		}
		const index = Math.abs(hash) % availablePreviews.length;
		return availablePreviews[index];
	};

	private get endpointBase(): string {
		return `http://${this.apiAddress}/${this.apiEndpointPrefix}/${this.apiVersion}`;
	}

	private constructAuthorizationHeader = (userId: string) => {
		return { Authorization: userId };
	};
}

export default new UseCases(env.TOURNAMENT_MANAGEMENT_SERVICE, 'api', 'v1');
