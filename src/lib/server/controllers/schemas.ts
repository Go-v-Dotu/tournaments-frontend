import { z } from 'zod';

const idSchema = z.object({ id: z.string() });

const userIdSchema = z.object({ user_id: z.string().optional() });

const usernameSchema = z.object({ username: z.string() });

const tournamentSchema = z
	.object({
		title: z.string(),
		date: z.string().transform((date) => new Date(date))
	})
	.merge(idSchema);

const tournamentPreviewSchema = z
	.object({
		total_players: z.number()
	})
	.merge(tournamentSchema);

const playerSchema = z
	.object({ username: z.string(), dropped: z.boolean() })
	.merge(idSchema)
	.merge(userIdSchema);

export { idSchema, tournamentSchema, tournamentPreviewSchema, playerSchema, usernameSchema };
