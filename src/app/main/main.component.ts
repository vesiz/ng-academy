import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as coursesActions from '../main/courses/courses-store/courses.actions';
import { CoursesState } from './courses/courses-store/courses.state';
import { UserListsFacade } from './profile/facades/user-lists.facade';
import { UsersFacade } from './users/facades/users.facade';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
	destroy$ = new Subject<boolean>();

	constructor(
		private usersFacade: UsersFacade, //
		private coursesStore: Store<CoursesState>,
		private userListsFacade: UserListsFacade
	) {}

	ngOnInit(): void {
		this.usersFacade.loadUsers();

		this.usersFacade
			.getUsers()
			.pipe(takeUntil(this.destroy$))
			.subscribe((response) => {
				this.usersFacade.storeLoggedUser();
			});

		this.coursesStore.dispatch(coursesActions.loadCourses());
		this.userListsFacade.loadLists();
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
