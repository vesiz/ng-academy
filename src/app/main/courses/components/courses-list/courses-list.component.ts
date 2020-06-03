import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { UsersFacade } from 'src/app/main/users/facades/users.facade';
import { Course } from 'src/app/shared/models/course.model';
import { User } from 'src/app/shared/models/user.model';
import * as CoursesSelectors from '../../courses-store/courses.selectors';
import { CoursesState } from '../../courses-store/courses.state';

@Component({
	selector: 'app-courses-list',
	templateUrl: './courses-list.component.html',
	styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
	courses: Course[];
	loggedUser: User;

	constructor(private store: Store<CoursesState>, private usersFacade: UsersFacade) {}

	ngOnInit(): void {
		this.getCourses();
		this.getLoggedUser();
	}

	getCourses(): void {
		this.store.pipe(select(CoursesSelectors.selectCourses)).subscribe((response) => {
			if (response.length !== 0) {
				this.courses = response;
			}
		});
	}

	getLoggedUser(): void {
		this.usersFacade.getLoggedUser().subscribe((response) => {
			this.loggedUser = response;
		});
	}
}
