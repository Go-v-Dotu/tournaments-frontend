import { z } from 'zod';

const tournamentTitleMinLength = 3;
const tournamentTitleMaxLength = 64;

export const hostTournamentFormSchema = z.object({
	title: z
		.string()
		.min(tournamentTitleMinLength, {
			message: `Title must have at least ${tournamentTitleMinLength} characters`
		})
		.max(tournamentTitleMaxLength, {
			message: `Title must have less then ${tournamentTitleMaxLength} characters`
		}),
	date: z.string().refine((v) => v, { message: 'Tournament must have a date' })
});

export type HostTournamentFormSchema = typeof hostTournamentFormSchema;
