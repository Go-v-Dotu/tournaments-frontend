type UserId = string;
type Username = string;
type HashedPassword = string;

interface UserPublic {
	id: UserId;
	username: Username;
}

interface User extends UserPublic {
	hashed_password: HashedPassword;
}

export type { UserId, Username, UserPublic, User };
