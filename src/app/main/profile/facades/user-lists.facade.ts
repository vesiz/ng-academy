import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { User } from 'src/app/shared/models/user.model';
import * as CourseActions from '../../courses/courses-store/courses.actions';
import * as CourseSelectors from '../../courses/courses-store/courses.selectors';
import { CoursesState } from '../../courses/courses-store/courses.state';
import { UsersFacade } from '../../users/facades/users.facade';

@Injectable({
	providedIn: 'root',
})
export class UserListsFacade {
	loggedUser: User;

	constructor(private usersFacade: UsersFacade, private store: Store<CoursesState>) {
		this.getLoggedUser();
	}

	getLoggedUser(): void {
		this.usersFacade.getLoggedUser().subscribe((response) => {
			this.loggedUser = response;
		});
	}

	loadLists(): void {
		this.store.pipe(select(CourseSelectors.selectCourses)).subscribe((response) => {
			if (this.loggedUser) {
				const userFavourites = response.filter((course) => course.favouritedBy.includes(this.loggedUser.id));
				const userCourses = response.filter((course) => course.adminId === this.loggedUser.id);

				this.store.dispatch(CourseActions.storeUserFavourites({ payload: userFavourites }));
				this.store.dispatch(CourseActions.storeUserCourses({ payload: userCourses }));
			}
		});
	}
}
