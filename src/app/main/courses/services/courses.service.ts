import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Course } from '../../../shared/models/course.model';

@Injectable({
	providedIn: 'root',
})
export class CoursesService {
	baseUrl = `${environment.apiUrl}`;

	constructor(private http: HttpClient) {}

	getCourses(): Observable<Course[]> {
		return this.http.get<Course[]>(`${this.baseUrl}/courses`);
	}

	getCourseById(id: number): Observable<Course> {
		return this.http.get<Course>(`${this.baseUrl}/courses/${id}`);
	}

	addCourse(course: Course): Observable<Course> {
		return this.http.post<Course>(`${this.baseUrl}/courses`, course);
	}

	updateCourse(course: Course): Observable<Course> {
		return this.http.patch<Course>(`${this.baseUrl}/courses/${course.id}`, course);
	}

	deleteCourse(id: number): Observable<{}> {
		return this.http.delete<Course>(`${this.baseUrl}/courses/${id}`);
	}

	getLastPost(): Observable<number> {
		return this.http.get<Course[]>(`${this.baseUrl}/courses?_sort=id&_order=desc&_start=0&_end=1`).pipe(
			map((courses) => {
				if (courses.length !== 0) {
					return courses[0].id + 1;
				} else {
					return 1;
				}
			})
		);
	}
}
