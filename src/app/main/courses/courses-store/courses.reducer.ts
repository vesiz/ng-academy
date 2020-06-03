import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import { CoursesState, initialCoursesState } from './courses.state';

export const coursesReducer = createReducer(
	initialCoursesState,
	on(CoursesActions.storeCourses, (state, action) => {
		return {
			...state,
			courses: [...action.payload],
		};
	}),
	on(CoursesActions.storeUserCourses, (state, action) => {
		return {
			...state,
			loggedUserCourses: [...action.payload],
		};
	}),
	on(CoursesActions.storeUserFavourites, (state, action) => {
		return {
			...state,
			loggedUserFavourites: [...action.payload],
		};
	}),
	on(CoursesActions.addCourse, (state, action) => {
		return {
			...state,
			courses: [...state.courses, action.payload],
			loggedUserCourses: [...state.loggedUserCourses, action.payload],
		};
	}),
	on(CoursesActions.updateCourse, (state, action) => {
		return {
			...state,
			courses: state.courses.map((course) => (course.id === action.payload.id ? action.payload : course)),
			loggedUserCourses: state.loggedUserCourses.map((course) => (course.id === action.payload.id ? action.payload : course)),
			loggedUserFavourites: state.loggedUserFavourites.map((course) => (course.id === action.payload.id ? action.payload : course)),
		};
	}),
	on(CoursesActions.deleteCourse, (state, action) => {
		return {
			...state,
			courses: [...state.courses.filter((course) => course.id !== action.payload)],
			loggedUserCourses: [...state.loggedUserCourses.filter((course) => course.id !== action.payload)],
		};
	})
);

export const coursesFeatureKey = 'courses';

export const reducer = (state: CoursesState, action: Action) => {
	return coursesReducer(state, action);
};
