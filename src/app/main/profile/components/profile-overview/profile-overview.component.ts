import { Component, OnInit } from '@angular/core';

import { AuthFacade } from 'src/app/auth/facades/auth.facade';
import { UsersFacade } from 'src/app/main/users/facades/users.facade';
import { Course } from 'src/app/shared/models/course.model';
import { User } from 'src/app/shared/models/user.model';

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
