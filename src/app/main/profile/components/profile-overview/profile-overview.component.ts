import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AuthFacade } from 'src/app/auth/facades/auth.facade';
import { CoursesState } from 'src/app/main/courses/courses-store/courses.state';
import { UsersFacade } from 'src/app/main/users/facades/users.facade';
import { Course } from 'src/app/shared/models/course.model';
import { User } from 'src/app/shared/models/user.model';
import * as CoursesSelectors from '../../../courses/courses-store/courses.selectors';
import { UserListsFacade } from '../../facades/user-lists.facade';

@Component({
	selector: 'app-profile-overview',
	templateUrl: './profile-overview.component.html',
	styleUrls: ['./profile-overview.component.scss'],
})
export class ProfileOverviewComponent implements OnInit {
	loggedUser: User;
	courses: Course[];

	constructor(
		private usersFacade: UsersFacade, //
		private coursesStore: Store<CoursesState>,
		private userListsFacade: UserListsFacade,
		private authFacade: AuthFacade
	) {}

	ngOnInit(): void {
		this.getLoggedUser();
	}

	getLoggedUser(): void {
		this.usersFacade.getLoggedUser().subscribe((response) => {
			this.loggedUser = response;
		});
	}

	logout(): void {
		this.authFacade.logout();
	}
}
