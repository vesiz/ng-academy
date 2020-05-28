import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	baseUrl = environment.apiUrl;

	constructor(private http: HttpClient) {}

	login(user: User): Observable<AuthResponse> {
		return this.http.post<AuthResponse>(`${this.baseUrl}/login`, user);
	}

	register(user: User): Observable<AuthResponse> {
		return this.http.post<AuthResponse>(`${this.baseUrl}/register`, user);
	}
}
