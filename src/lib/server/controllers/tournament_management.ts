import { z } from 'zod';

import { hostedTournamentPreviewSchema } from './schemas';

const getAllTournamentPreviewsSchemaController = z.object({
	tournaments: hostedTournamentPreviewSchema.array()
});
type GetAllTournamentPreviewsSchemaController = z.infer<
	typeof getAllTournamentPreviewsSchemaController
>;

const hostTournamentSchema = z.object({
	title: z.string(),
	date: z.string()
});
type HostTournamentSchema = z.infer<typeof hostTournamentSchema>;

const hostTournamentSchemaController = z.object({});
type HostTournamentSchemaController = z.infer<typeof hostTournamentSchemaController>;

export {
	getAllTournamentPreviewsSchemaController,
	type GetAllTournamentPreviewsSchemaController,
	hostTournamentSchema,
	type HostTournamentSchema,
	hostTournamentSchemaController,
	type HostTournamentSchemaController
};
