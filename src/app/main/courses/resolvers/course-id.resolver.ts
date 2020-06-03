import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CoursesService } from '../services/courses.service';

@Injectable({
	providedIn: 'root',
})
export class CourseIdResolver implements Resolve<number> {
	constructor(private coursesService: CoursesService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): number | Observable<number> | Promise<number> {
		return this.coursesService.getLastPost();
	}
}
