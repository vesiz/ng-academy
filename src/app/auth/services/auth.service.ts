import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	baseUrl = environment.apiUrl;

	constructor(private http: HttpClient) {}

	login(user: User): Observable<string> {
		return this.http.post<string>(`${this.baseUrl}/login`, user);
	}

	register(user: User): Observable<string> {
		return this.http.post<string>(`${this.baseUrl}/register`, user);
	}
}
