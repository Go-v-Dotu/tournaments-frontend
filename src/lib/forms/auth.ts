import { z } from 'zod';

const usernameMinLength = 2;
const passwordMinLength = 8;

export const signUpFormSchema = z.object({
	username: z.string().min(usernameMinLength, {
		message: `Username must have at least ${usernameMinLength} characters`
	}),
	password: z.string().min(passwordMinLength, {
		message: `Password must have at least ${passwordMinLength} characters`
	})
});

export type SignUpFormSchema = typeof signUpFormSchema;
