import type { UserId, Username } from './user';

type TournamentId = string;

type TournamentTitle = string;

interface TournamentIdEmbed {
	id: string;
}

interface Tournament extends TournamentIdEmbed {
	title: TournamentTitle;
	date: Date;
	totalPlayers: number;
}

interface TournamentPreview extends Tournament {
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
