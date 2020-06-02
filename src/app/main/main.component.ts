import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UsersFacade } from './users/facades/users.facade';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
	destroy$ = new Subject<boolean>();

	constructor(private usersFacade: UsersFacade) {}

	ngOnInit(): void {
		this.usersFacade.loadUsers();

		this.usersFacade
			.getUsers()
			.pipe(takeUntil(this.destroy$))
			.subscribe((response) => {
				this.usersFacade.storeLoggedUser();
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
