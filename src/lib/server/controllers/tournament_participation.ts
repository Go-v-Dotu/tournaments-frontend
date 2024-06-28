import { z } from 'zod';

import { tournamentSchema, tournamentPreviewSchema, playerSchema, hostSchema } from './schemas';

const participatedTournamentSchema = z
	.object({ player_enrolled: z.boolean(), host: hostSchema })
	.merge(tournamentSchema);

const participatedTournamentPreviewSchema = z
	.object({ host: hostSchema })
	.merge(tournamentPreviewSchema);

const getTournamentByIdSchemaController = z.object({
	tournament: participatedTournamentSchema
});
type GetTournamentByIdSchemaController = z.infer<typeof getTournamentByIdSchemaController>;

const getAllTournamentPreviewsSchemaController = z.object({
	tournaments: participatedTournamentPreviewSchema.array()
});
type GetAllTournamentPreviewsSchemaController = z.infer<
	typeof getAllTournamentPreviewsSchemaController
>;

const getAllParticipatedTournamentPreviewsSchemaController = z.object({
	tournaments: tournamentPreviewSchema.array()
});
type GetAllParticipatedTournamentPreviewsSchemaController = z.infer<
	typeof getAllParticipatedTournamentPreviewsSchemaController
>;

const getAllPlayersSchemaController = z.object({
	players: playerSchema.array()
});
type GetAllPlayersSchemaController = z.infer<typeof getAllPlayersSchemaController>;

export {
	getTournamentByIdSchemaController,
	type GetTournamentByIdSchemaController,
	getAllTournamentPreviewsSchemaController,
	type GetAllTournamentPreviewsSchemaController,
	getAllParticipatedTournamentPreviewsSchemaController,
	type GetAllParticipatedTournamentPreviewsSchemaController,
	getAllPlayersSchemaController,
	type GetAllPlayersSchemaController
};
