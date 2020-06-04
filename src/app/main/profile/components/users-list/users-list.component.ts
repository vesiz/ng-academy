import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersFacade } from 'src/app/main/users/facades/users.facade';
import { User } from 'src/app/shared/models/user.model';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
	loggedUser: User;
	users: User[];

	constructor(private usersFacade: UsersFacade, private router: Router) {
		this.getUsers();
	}

	ngOnInit(): void {
		this.getLoggedUser();
	}

	getUsers(): void {
		this.usersFacade.getUsers().subscribe((response) => {
			this.users = response;
		});
	}

	getLoggedUser(): void {
		this.usersFacade.getLoggedUser().subscribe((response) => {
			this.loggedUser = response;

			if (this.loggedUser) {
				if (!this.loggedUser.adminRights) {
					this.router.navigate(['/not-found']);

					return;
				}
			}
		});
	}

	onDelete(user: User): void {
		if (!confirm('Are you sure you want to delete this user? This action cannot be undone')) {
			return;
		}

		this.usersFacade.deleteUser(user.id);
	}

	onBlock(user: User): void {
		if (!confirm('Are you sure you want to block this user? They will never be able to create an account again.')) {
			return;
		}

		this.usersFacade.blockUser(user);
	}
}
