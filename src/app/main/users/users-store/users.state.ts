import { User } from 'src/app/shared/models/user.model';

export interface UsersState {
	allUsers: User[];
	loggedUser: User;
}

export const initialUsersState: UsersState = {
	allUsers: [],
	loggedUser: null,
};
