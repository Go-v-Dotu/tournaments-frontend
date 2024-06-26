import { z } from 'zod';

const idSchema = z.object({ id: z.string() });

const hostedTournamentPreviewSchema = z
	.object({
		title: z.string(),
		date: z.string().transform((date) => new Date(date)),
		total_players: z.number()
	})
	.merge(idSchema);

export { hostedTournamentPreviewSchema };
// {
//     id: '667c88bf131dd02644769b74',
//     title: '',
//     date: '0001-01-01T03:00:00+03:00',
//     total_players: 0
//   }
