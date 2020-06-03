import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { CoursesState } from 'src/app/main/courses/courses-store/courses.state';
import { UsersFacade } from 'src/app/main/users/facades/users.facade';
import { Course } from 'src/app/shared/models/course.model';
import { User } from 'src/app/shared/models/user.model';
import * as CoursesActions from '../../../courses/courses-store/courses.actions';
import * as CoursesSelectors from '../../../courses/courses-store/courses.selectors';
import { UserListsFacade } from '../../facades/user-lists.facade';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	loggedUser: User;
	courses: Course[];

	constructor(
		private usersFacade: UsersFacade, //
		private coursesStore: Store<CoursesState>,
		private userListsFacade: UserListsFacade
	) {}

	ngOnInit(): void {
		this.getLoggedUser();
	}

	getLoggedUser(): void {
		this.usersFacade.getLoggedUser().subscribe((response) => {
			this.loggedUser = response;

			if (this.loggedUser) {
				this.getCourses();
			}
		});
	}

	getCourses(): void {
		if (this.loggedUser.adminRights) {
			this.coursesStore.pipe(select(CoursesSelectors.selectLoggedUserCourses)).subscribe((response) => {
				this.courses = response;
			});
		} else {
			this.coursesStore.pipe(select(CoursesSelectors.selectloggedUserFavourites)).subscribe((response) => {
				this.courses = response;
			});
		}
	}
}
