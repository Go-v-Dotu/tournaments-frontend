type TournamentId = string;

interface TournamentIdEmbed {
	id: string;
}

interface Tournament extends TournamentIdEmbed {
	title: string;
	host: string;
	createdAt: Date;
	previewUrl: string;
	status: string;
}

export type { TournamentId, Tournament };
