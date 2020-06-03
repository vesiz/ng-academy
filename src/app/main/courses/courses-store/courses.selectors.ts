import { createFeatureSelector, createSelector } from '@ngrx/store';

import { coursesFeatureKey } from './courses.reducer';
import { CoursesState } from './courses.state';

export const selectCoursesFeature = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const selectCourses = createSelector(
	selectCoursesFeature, //
	(state: CoursesState) => state.courses
);

export const selectLoggedUserCourses = createSelector(
	selectCoursesFeature, //
	(state: CoursesState) => state.loggedUserCourses
);

export const selectloggedUserFavourites = createSelector(
	selectCoursesFeature, //
	(state: CoursesState) => state.loggedUserFavourites
);
