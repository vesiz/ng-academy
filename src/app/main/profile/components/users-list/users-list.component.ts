import { Component, OnInit } from '@angular/core';

import { UsersFacade } from 'src/app/main/users/facades/users.facade';
import { User } from 'src/app/shared/models/user.model';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
	users: User[];

	constructor(private usersFacade: UsersFacade) {
		this.getUsers();
	}

	ngOnInit(): void {}

	getUsers(): void {
		this.usersFacade.getUsers().subscribe((response) => {
			this.users = response;
		});
	}

	onDelete(user: User): void {
		if (!confirm('Are you sure you want to delete this user? This action cannot be undone')) {
			return;
		}

		this.usersFacade.deleteUser(user.id);
	}

	onBlock(user: User): void {
		console.log(user);
	}
}
