import { Course } from '../../../shared/models/course.model';

export interface CoursesState {
	courses: Course[];
	loggedUserCourses: Course[];
	loggedUserFavourites: Course[];
}

export const initialCoursesState: CoursesState = {
	courses: [],
	loggedUserCourses: [],
	loggedUserFavourites: [],
};
