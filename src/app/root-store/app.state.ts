import { CoursesState, initialCoursesState } from '../main/courses/courses-store/courses.state';
import { initialUsersState, UsersState } from '../main/users/users-store/users.state';

export interface AppState {
	users: UsersState;
	courses: CoursesState;
}

export const initialAppState: AppState = {
	users: initialUsersState,
	courses: initialCoursesState,
};
