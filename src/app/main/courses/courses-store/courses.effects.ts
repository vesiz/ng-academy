import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { CoursesService } from '../services/courses.service';
import * as CoursesActions from './courses.actions';

@Injectable()
export class CoursesEffects {
	loadCourses$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CoursesActions.loadCourses),
			mergeMap((action) => {
				return this.coursesService.getCourses().pipe(
					map((response) => {
						return CoursesActions.storeCourses({ payload: response });
					})
				);
			})
		)
	);

	loadCourse$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CoursesActions.loadCourse),
			mergeMap((action) => {
				return this.coursesService.getCourseById(action.payload).pipe(
					map((response) => {
						return CoursesActions.storeCourse({ payload: response });
					})
				);
			})
		)
	);

	addCourse$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(CoursesActions.addCourse),
				mergeMap((action) => this.coursesService.addCourse(action.payload))
			),
		{ dispatch: false }
	);

	updateCourse$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(CoursesActions.updateCourse),
				mergeMap((action) => this.coursesService.updateCourse(action.payload))
			),
		{ dispatch: false }
	);

	deleteCourse$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(CoursesActions.deleteCourse),
				mergeMap((action) => this.coursesService.deleteCourse(action.payload))
			),
		{ dispatch: false }
	);

	constructor(private actions$: Actions, private coursesService: CoursesService) {}
}
