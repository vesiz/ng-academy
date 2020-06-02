import { Action, createReducer, on } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { initialUsersState, UsersState } from './users.state';

export const usersReducer = createReducer(
	initialUsersState,
	on(UsersActions.storeUsers, (state, action) => {
		return {
			...state,
			allUsers: action.users,
		};
	}),
	on(UsersActions.storeLoggedUser, (state, action) => {
		return {
			...state,
			loggedUser: action.user,
		};
	}),
	on(UsersActions.storeUpdatedUser, (state, action) => {
		const usersList = [...state.allUsers];

		return {
			...state,
			allUsers: usersList.map((user) => (user.email === action.updatedUser.email ? action.updatedUser : user)),
			loggedUser: { ...action.updatedUser },
		};
	})
);

export const usersFeatureKey = 'users';

export const reducer = (state: UsersState, action: Action) => {
	return usersReducer(state, action);
};
