import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	baseUrl = 'http://localhost:3000/660';

	constructor(private http: HttpClient) {}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(`${this.baseUrl}/users`);
	}

	getUser(email): Observable<User> {
		return this.http.get<User>(`${this.baseUrl}/users?email=${email}`);
	}

	updateUser(user: User): Observable<User> {
		return this.http.put<User>(`${this.baseUrl}/users/${user.id}`, user);
	}
}
