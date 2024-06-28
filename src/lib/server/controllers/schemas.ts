import { z } from 'zod';

const idSchema = z.object({ id: z.string() });

const userIdSchema = z.object({ user_id: z.string() });
const optionalUserIdSchema = z.object({ user_id: z.string().optional() });

const usernameSchema = z.object({ username: z.string() });

const hostSchema = z.object({}).merge(idSchema).merge(userIdSchema).merge(usernameSchema);

const tournamentPreviewSchema = z
	.object({
		title: z.string(),
		date: z.string().transform((date) => new Date(date)),
		total_players: z.number()
	})
	.merge(idSchema);

const tournamentSchema = z.object({}).merge(tournamentPreviewSchema);

const playerSchema = z
	.object({ username: z.string(), dropped: z.boolean() })
	.merge(idSchema)
	.merge(optionalUserIdSchema);

export {
	idSchema,
	hostSchema,
	tournamentSchema,
	tournamentPreviewSchema,
	playerSchema,
	usernameSchema
};
