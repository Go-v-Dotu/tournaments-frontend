import type { UserId, Username } from './user';

type TournamentId = string;

type TournamentTitle = string;

interface TournamentIdEmbed {
	id: string;
}

type HostId = string;

interface Host {
	id: HostId;
	userId: UserId;
	username: Username;
}

interface CommonTournamentInfo extends TournamentIdEmbed {
	title: TournamentTitle;
	date: Date;
	host: Host;
	totalPlayers: number;
}

interface Tournament extends CommonTournamentInfo {
	player_enrolled: boolean;
}

interface TournamentPreview extends CommonTournamentInfo {
	previewUrl: string;
}

type PlayerId = string;

interface Player {
	userId: UserId | undefined;
	playerId: PlayerId;
	username: Username;
	dropped: boolean;
}

export type { PlayerId, Player, TournamentId, TournamentTitle, Tournament, TournamentPreview };
