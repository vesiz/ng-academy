import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

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

	constructor(private actions$: Actions, private usersService: UsersService) {}
}
