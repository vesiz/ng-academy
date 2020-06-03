import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthFacade } from 'src/app/auth/facades/auth.facade';
import { User } from 'src/app/shared/models/user.model';
import * as UsersActions from '../users-store/users.actions';
import * as UsersSelectors from '../users-store/users.selectors';
import { UsersState } from '../users-store/users.state';

@Injectable({
	providedIn: 'root',
})
export class UsersFacade implements OnDestroy {
	destroy$ = new Subject<boolean>();

	constructor(private store: Store<UsersState>, private authFacade: AuthFacade) {}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}

	loadUsers(): void {
		this.store.dispatch(UsersActions.loadUsers());
	}

	storeLoggedUser(): void {
		let loggedUser: User;
		const userEmail = this.authFacade.getLoggedUserEmail();

		this.getUsers()
			.pipe(takeUntil(this.destroy$))
			.subscribe((users) => {
				if (users.length > 0) {
					loggedUser = users.find((item) => item.email === userEmail);
				}
			});

		this.store.dispatch(UsersActions.storeLoggedUser({ user: loggedUser }));
	}

	updateUser(user: User): void {
		this.store.dispatch(UsersActions.storeUpdatedUser({ updatedUser: user }));
		this.store.dispatch(UsersActions.updateUser({ user: user }));
	}

	deleteUser(id: number): void {
		this.store.dispatch(UsersActions.deleteUser({ id: id }));
	}

	storeUpdatedUser(user: User): void {
		this.store.dispatch(UsersActions.storeUpdatedUser({ updatedUser: user }));
	}

	getLoggedUser(): Observable<User> {
		return this.store.pipe(select(UsersSelectors.selectLoggedUser));
	}

	getUsers(): Observable<User[]> {
		return this.store.pipe(select(UsersSelectors.selectAllUsers));
	}

	getUser(id: number | string): Observable<User> {
		return this.store.pipe(select(UsersSelectors.selectUser, { id: id }));
	}
}
