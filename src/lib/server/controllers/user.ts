import { z } from 'zod';

import { idSchema, usernameSchema } from './schemas';

const createUserSchema = z.object({}).merge(idSchema).merge(usernameSchema);
type CreateUserSchema = z.infer<typeof createUserSchema>;

const createUserSchemaController = z.object({});
type CreateUserSchemaController = z.infer<typeof createUserSchemaController>;

export {
	createUserSchema,
	type CreateUserSchema,
	createUserSchemaController,
	type CreateUserSchemaController
};
