import { z } from 'zod';

const tournamentTitleMinLength = 3;
const tournamentTitleMaxLength = 64;
const hostTournamentFormSchema = z.object({
	title: z
		.string()
		.min(tournamentTitleMinLength, {
			message: `Title must have at least ${tournamentTitleMinLength} characters`
		})
		.max(tournamentTitleMaxLength, {
			message: `Title must have less then ${tournamentTitleMaxLength} characters`
		}),
	date: z.string().refine((v) => v, { message: 'Tournament date required' })
});
type HostTournamentFormSchema = typeof hostTournamentFormSchema;

const usernameMinLength = 3;
const addGuestPlayerFormSchema = z.object({
	username: z.string().min(usernameMinLength, {
		message: `Username must have at least ${usernameMinLength} characters`
	})
});
type AddGuestPlayerFormSchema = typeof addGuestPlayerFormSchema;

export {
	hostTournamentFormSchema,
	type HostTournamentFormSchema,
	addGuestPlayerFormSchema,
	type AddGuestPlayerFormSchema
};
