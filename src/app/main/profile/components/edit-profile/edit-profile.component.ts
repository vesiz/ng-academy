import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthFacade } from 'src/app/auth/facades/auth.facade';
import { UsersFacade } from 'src/app/main/users/facades/users.facade';
import { User } from 'src/app/shared/models/user.model';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
	profileForm: FormGroup;
	loggedUser: User;
	errorMessage = '';
	loading$ = new Subject<boolean>();

	constructor(
		private fb: FormBuilder, //
		private authFacade: AuthFacade,
		private router: Router,
		private usersFacade: UsersFacade
	) {}

	ngOnInit(): void {
		this.getLoggedUser();
	}

	buildForm(): void {
		this.profileForm = this.fb.group(
			{
				firstName: [this.loggedUser.firstName, [Validators.required]],
				lastName: [this.loggedUser.lastName, [Validators.required]],
				avatar: [this.loggedUser.avatar, [Validators.required]],
				newPassword: [''],
				confirmPassword: [''],
				currentPassword: ['', [Validators.required]],
			},
			{ validators: this.validatePassword }
		);
	}

	validatePassword(control: FormGroup): { [key: string]: boolean } | null {
		if (
			control.controls.newPassword.value !== control.controls.confirmPassword.value &&
			control.controls.newPassword.value.length > 4
		) {
			return { confirmPassword: true };
		}

		return null;
	}

	getLoggedUser(): void {
		this.usersFacade.getLoggedUser().subscribe((response) => {
			this.loggedUser = response;

			if (this.loggedUser) {
				if (this.loggedUser.adminRights) {
					this.router.navigate(['/not-found']);

					return;
				}

				this.buildForm();
			}
		});
	}

	onSubmit(): void {
		const loginCredentials: User = {
			email: this.loggedUser.email,
			password: this.profileForm.value.currentPassword,
		};

		let updatedUser: User;

		if (this.profileForm.value.newPassword.length === 0) {
			updatedUser = {
				id: this.loggedUser.id,
				email: this.loggedUser.email,
				firstName: this.profileForm.value.firstName,
				lastName: this.profileForm.value.lastName,
				avatar: this.profileForm.value.avatar,
			};
		} else {
			updatedUser = {
				id: this.loggedUser.id,
				email: this.loggedUser.email,
				password: this.profileForm.value.newPassword,
				firstName: this.profileForm.value.firstName,
				lastName: this.profileForm.value.lastName,
				avatar: this.profileForm.value.avatar,
			};
		}

		this.authFacade.login(loginCredentials).subscribe(
			(response) => {
				this.loading$.next(false);
				this.usersFacade.updateUser(updatedUser);
				this.router.navigate(['/profile']);
			},
			(error: HttpErrorResponse) => {
				this.errorMessage = error.error;
				this.loading$.next(false);
				this.buildForm();
			}
		);
	}
}
