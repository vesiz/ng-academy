import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export enum actionTypes {
	LOAD_USERS = '[Users] Load Users',
	STORE_USERS = '[Users] Store Users',
	STORE_LOGGED_USER = '[Users] Store Logged User',
	UPDATE_USER = '[Users] Update User',
	STORE_UPDATED_USER = '[Users] Store Updated User',
	DELETE_USER = '[Users] Delete User',
	BLOCK_USER = '[Users] Block User',
}

export const storeUsers = createAction(
	actionTypes.STORE_USERS, //
	props<{ users: User[] }>()
);

export const loadUsers = createAction(actionTypes.LOAD_USERS);

export const storeLoggedUser = createAction(
	actionTypes.STORE_LOGGED_USER, //
	props<{ user: User }>()
);

export const updateUser = createAction(
	actionTypes.UPDATE_USER, //
	props<{ user: User }>()
);

export const storeUpdatedUser = createAction(
	actionTypes.STORE_UPDATED_USER, //
	props<{ updatedUser: User }>()
);

export const deleteUser = createAction(
	actionTypes.DELETE_USER, //
	props<{ id: number }>()
);

export const blockUser = createAction(
	actionTypes.BLOCK_USER, //
	props<{ payload: User }>()
);
