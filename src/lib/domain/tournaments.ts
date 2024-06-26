type TournamentId = string;

type TournamentTitle = string;

type TournamentDate = Date;

interface TournamentIdEmbed {
	id: string;
}

interface TournamentPreview extends TournamentIdEmbed {
	title: string;
	host: string;
	createdAt: Date;
	previewUrl: string;
	status: string;
}

export type { TournamentId, TournamentTitle, TournamentDate, TournamentPreview };
