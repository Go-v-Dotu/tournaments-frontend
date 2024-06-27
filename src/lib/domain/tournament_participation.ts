type TournamentId = string;

type TournamentTitle = string;

interface TournamentIdEmbed {
	id: string;
}
interface Tournament extends TournamentIdEmbed {
	title: TournamentTitle;
	date: Date;
	host: string;
	totalPlayers: number;
}

interface TournamentPreview extends Tournament {
	previewUrl: string;
}

export type { TournamentId, TournamentTitle, Tournament, TournamentPreview };
