import { ActionReducerMap } from '@ngrx/store';

import * as fromCoursesReducer from '../main/courses/courses-store/courses.reducer';
import * as fromUsersReducer from '../main/users/users-store/users.reducer';
import { AppState } from './app.state';

export const appReducers: ActionReducerMap<AppState> = {
	users: fromUsersReducer.reducer,
	courses: fromCoursesReducer.reducer,
};
