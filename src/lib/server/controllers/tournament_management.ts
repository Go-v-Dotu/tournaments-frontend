import { z } from 'zod';

import {
	idSchema,
	tournamentSchema,
	tournamentPreviewSchema,
	playerSchema,
	usernameSchema
} from './schemas';

const getTournamentByIdSchemaController = z.object({
	tournament: tournamentSchema
});
type GetTournamentByIdSchemaController = z.infer<typeof getTournamentByIdSchemaController>;

const getAllTournamentPreviewsSchemaController = z.object({
	tournaments: tournamentPreviewSchema.array()
});
type GetAllTournamentPreviewsSchemaController = z.infer<
	typeof getAllTournamentPreviewsSchemaController
>;

const hostTournamentSchema = z.object({
	title: z.string(),
	date: z.string()
});
type HostTournamentSchema = z.infer<typeof hostTournamentSchema>;

const hostTournamentSchemaController = z.object({}).merge(idSchema);
type HostTournamentSchemaController = z.infer<typeof hostTournamentSchemaController>;

const getAllPlayersSchemaController = z.object({
	players: playerSchema.array()
});
type GetAllPlayersSchemaController = z.infer<typeof getAllPlayersSchemaController>;

const addGuestPlayerSchema = usernameSchema;
type AddGuestPlayerSchema = z.infer<typeof addGuestPlayerSchema>;

const addGuestPlayerSchemaController = z.object({}).merge(idSchema);
type AddGuestPlayerSchemaController = z.infer<typeof addGuestPlayerSchemaController>;

const addPlayerSchemaController = z.object({});
type AddPlayerSchemaController = z.infer<typeof addPlayerSchemaController>;

const dropPlayerSchemaController = z.object({});
type DropPlayerSchemaController = z.infer<typeof dropPlayerSchemaController>;

const recoverPlayerSchemaController = z.object({});
type RecoverPlayerSchemaController = z.infer<typeof recoverPlayerSchemaController>;

export {
	getTournamentByIdSchemaController,
	type GetTournamentByIdSchemaController,
	getAllTournamentPreviewsSchemaController,
	type GetAllTournamentPreviewsSchemaController,
	hostTournamentSchema,
	type HostTournamentSchema,
	hostTournamentSchemaController,
	type HostTournamentSchemaController,
	getAllPlayersSchemaController,
	type GetAllPlayersSchemaController,
	addGuestPlayerSchema,
	type AddGuestPlayerSchema,
	addPlayerSchemaController,
	type AddPlayerSchemaController,
	addGuestPlayerSchemaController,
	type AddGuestPlayerSchemaController,
	dropPlayerSchemaController,
	type DropPlayerSchemaController,
	recoverPlayerSchemaController,
	type RecoverPlayerSchemaController
};
