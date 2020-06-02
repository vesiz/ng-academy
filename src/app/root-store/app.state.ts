import { initialUsersState, UsersState } from '../main/users/users-store/users.state';

export interface AppState {
	users: UsersState;
}

export const initialAppState: AppState = {
	users: initialUsersState,
};
