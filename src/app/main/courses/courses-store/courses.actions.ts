import { createAction, props } from '@ngrx/store';

import { Course } from 'src/app/shared/models/course.model';

enum actionTypes {
	LOAD_COURSES = '[Courses] Load Courses',
	STORE_COURSES = '[Courses] Store Courses',
	STORE_USER_COURSES = '[Courses] Store User Courses',
	STORE_USER_FAVOURITES = '[Courses] Store User Favourites',
	LOAD_COURSE = '[Courses] Load Course',
	STORE_COURSE = '[Courses] Store Course',
	ADD_COURSE = '[Courses] Add Course',
	UPDATE_COURSE = '[Courses] Update Course',
	DELETE_COURSE = '[Courses] Delete Course',
}

export const loadCourses = createAction(
	actionTypes.LOAD_COURSES //
);

export const storeCourses = createAction(
	actionTypes.STORE_COURSES, //
	props<{ payload: Course[] }>()
);

export const storeUserCourses = createAction(
	actionTypes.STORE_USER_COURSES, //
	props<{ payload: Course[] }>()
);

export const storeUserFavourites = createAction(
	actionTypes.STORE_USER_FAVOURITES, //
	props<{ payload: Course[] }>()
);

export const loadCourse = createAction(
	actionTypes.LOAD_COURSE, //
	props<{ payload: number }>()
);

export const storeCourse = createAction(
	actionTypes.STORE_COURSE, //
	props<{ payload: Course }>()
);

export const addCourse = createAction(
	actionTypes.ADD_COURSE, //
	props<{ payload: Course }>()
);

export const updateCourse = createAction(
	actionTypes.UPDATE_COURSE, //
	props<{ payload: Course }>()
);

export const deleteCourse = createAction(
	actionTypes.DELETE_COURSE, //
	props<{ payload: number }>()
);
