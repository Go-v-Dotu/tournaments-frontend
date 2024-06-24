type TournamentId = string;

interface TournamentIdEmbed {
	id: string;
}

interface Tournament extends TournamentIdEmbed {
	name: string;
}

export type { TournamentId, Tournament };
