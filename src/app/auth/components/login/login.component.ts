import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthFacade } from '../../facades/auth.facade';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	loginForm: FormGroup;
	errorMessage = '';
	destory$ = new Subject<boolean>();
	loading$ = new Subject<boolean>();

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
		this.loginForm = this.fb.group({
			email: ['admin@mail.com', [Validators.required]],
			password: ['admin', [Validators.required]],
		});
	}

	onSubmit(): void {
		this.loading$.next(true);

		this.authFacade
			.login(this.loginForm.value)
			.pipe(takeUntil(this.destory$))
			.subscribe(
				(response) => {
					this.authFacade.setTokens(response.accessToken, this.loginForm.value.email);
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
