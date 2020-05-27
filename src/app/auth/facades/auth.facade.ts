import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthFacade {
	localStorageKeys = environment.localStorageKeys;
	tokenCreationDate: Date;

	constructor(private authService: AuthService) {}

	login(user: User): Observable<string> {
		return this.authService.login(user);
	}

	register(user: User): Observable<string> {
		return this.authService.register(user);
	}

	logout(): void {
		this.removeTokens();
		window.location.reload();
	}

	isAccessTokenExpired(): boolean {
		if (!this.getAccessToken()) {
			return true;
		}

		if (this.tokenCreationDate.getTime() + 3_600_000 < new Date().getTime()) {
			this.logout();

			return true;
		}

		return false;
	}

	getAccessToken(): string {
		this.tokenCreationDate = new Date(parseInt(localStorage.getItem(this.localStorageKeys.tokenCreationDateKey), 10));

		return localStorage.getItem(this.localStorageKeys.accessTokenKey);
	}

	removeTokens(): void {
		localStorage.removeItem(this.localStorageKeys.tokenCreationDateKey);
		localStorage.removeItem(this.localStorageKeys.accessTokenKey);
		localStorage.removeItem(this.localStorageKeys.loggedUserEmail);
	}

	setTokens(accessToken: string, email: string): void {
		this.setAccessToken(accessToken);
		this.setLoggedUserEmail(email);
	}

	setAccessToken(token: string): void {
		this.tokenCreationDate = new Date();
		localStorage.setItem(this.localStorageKeys.accessTokenKey, token);
		localStorage.setItem(this.localStorageKeys.tokenCreationDateKey, this.tokenCreationDate.getTime().toString());
	}

	setLoggedUserEmail(email: string): void {
		localStorage.setItem(this.localStorageKeys.loggedUserEmail, email);
	}

	getLoggedUserEmail(): string {
		return localStorage.getItem(this.localStorageKeys.loggedUserEmail);
	}
}
