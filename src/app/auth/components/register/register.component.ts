import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { AuthFacade } from '../../facades/auth.facade';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
	registerForm: FormGroup;
	destory$ = new Subject<boolean>();
	loading$ = new Subject<boolean>();

	errorMessage = '';
	baseAvatar = environment.baseAvatar;

	constructor(
		private fb: FormBuilder, //
		private authFacade: AuthFacade,
		private router: Router
	) {}

	ngOnInit(): void {
		this.buildForm();
	}

	ngOnDestroy(): void {
		this.destory$.next(true);
		this.destory$.unsubscribe();
	}

	buildForm(): void {
		this.registerForm = this.fb.group(
			{
				firstName: ['', [Validators.required]],
				lastName: ['', [Validators.required]],
				email: ['', [Validators.required]],
				password: ['', [Validators.required]],
				confirmPassword: ['', [Validators.required]],
				adminRights: [false],
			},
			{ validators: this.validatePassword }
		);
	}

	validatePassword(control: FormGroup): { [key: string]: boolean } | null {
		if (control.controls.password.value !== control.controls.confirmPassword.value) {
			return { confirmPassword: true };
		}

		return null;
	}

	getUserFromForm(): User {
		const user: User = {
			email: this.registerForm.value.email,
			password: this.registerForm.value.password,
			firstName: this.registerForm.value.firstName,
			lastName: this.registerForm.value.lastName,
			avatar: environment.baseAvatar,
			adminRights: this.registerForm.value.adminRights,
			ratedCourses: [],
		};

		return user;
	}

	onSubmit(): void {
		this.loading$.next(true);

		this.authFacade
			.register(this.getUserFromForm())
			.pipe(takeUntil(this.destory$))
			.subscribe(
				(response) => {
					this.authFacade.setTokens(response.accessToken, this.registerForm.value.email);
					this.loading$.next(false);
					this.router.navigate(['/']);
				},
				(error: HttpErrorResponse) => {
					this.errorMessage = error.error;
					this.loading$.next(false);
					this.buildForm();
				}
			);
	}
}
