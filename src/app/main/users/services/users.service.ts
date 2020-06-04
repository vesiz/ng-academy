import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { Blocked } from 'src/app/shared/models/blocked.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	baseUrl = 'http://localhost:3000';

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

	deleteUser(id: number): Observable<{}> {
		return this.http.delete<User>(`${this.baseUrl}/users/${id}`);
	}

	getBlockedUsers(): Observable<Blocked> {
		return this.http.get<Blocked>(`${this.baseUrl}/blocked`);
	}

	blockUser(user: User): Observable<Blocked> {
		return this.getBlockedUsers().pipe(
			concatMap((blocked) => {
				const updatedBlocked = {
					...blocked,
					users: [...blocked.users, user.email],
				};

				return this.http.patch<Blocked>(`${this.baseUrl}/blocked`, updatedBlocked);
			})
		);
	}
}
