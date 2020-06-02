import { createFeatureSelector, createSelector } from '@ngrx/store';

import { usersFeatureKey } from './users.reducer';
import { UsersState } from './users.state';

export const selectUsersFeature = createFeatureSelector<UsersState>(usersFeatureKey);

export const selectLoggedUser = createSelector(
	selectUsersFeature, //
	(state: UsersState) => state.loggedUser
);

export const selectAllUsers = createSelector(
	selectUsersFeature, //
	(state: UsersState) => state.allUsers
);

export const selectUser = createSelector(
	selectUsersFeature, //
	(state: UsersState, props) => state.allUsers.find((user) => user.id === parseInt(props.id, 10))
);
