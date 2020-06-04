import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';

import { UsersService } from '../services/users.service';
import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {
	loadUsers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.loadUsers),
			mergeMap((action) => {
				return this.usersService.getUsers().pipe(
					map((response) => {
						return UsersActions.storeUsers({ users: response });
					}),
					catchError(() => EMPTY)
				);
			})
		)
	);

	updateUser$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(UsersActions.updateUser),
				mergeMap((action) => {
					return this.usersService.updateUser(action.user);
				})
			),
		{ dispatch: false }
	);

	deleteUser$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(UsersActions.deleteUser),
				mergeMap((action) => {
					return this.usersService.deleteUser(action.id);
				})
			),
		{ dispatch: false }
	);

	blockUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.blockUser),
			concatMap((action) => {
				return this.usersService.blockUser(action.payload).pipe(
					map((response) => {
						return UsersActions.deleteUser({ id: action.payload.id });
					})
				);
			})
		)
	);

	constructor(private actions$: Actions, private usersService: UsersService) {}
}
