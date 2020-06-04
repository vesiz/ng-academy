import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, iif, Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

import { UsersService } from 'src/app/main/users/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	baseUrl = environment.apiUrl;

	constructor(private http: HttpClient, private usersService: UsersService) {}

	login(user: User): Observable<AuthResponse> {
		return this.http.post<AuthResponse>(`${this.baseUrl}/login`, user);
	}

	register(user: User): Observable<AuthResponse> {
		return this.usersService.getBlockedUsers().pipe(
			concatMap((response) => {
				return iif(
					() => {
						return response.users.includes(user.email);
					},
					EMPTY,
					this.http.post<AuthResponse>(`${this.baseUrl}/register`, user)
				);
			})
		);
	}
}
