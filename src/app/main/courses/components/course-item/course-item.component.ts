import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { UsersFacade } from 'src/app/main/users/facades/users.facade';
import { Course } from 'src/app/shared/models/course.model';
import { User } from 'src/app/shared/models/user.model';
import * as CoursesActions from '../../courses-store/courses.actions';
import { CoursesState } from '../../courses-store/courses.state';

@Component({
	selector: 'app-course-item',
	templateUrl: './course-item.component.html',
	styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent implements OnInit {
	@Input() course: Course;
	author: User;
	loggedUser: User;
	rating = 0;
	newRating = 1;

	isCourseFavourited = false;
	isCourseRated = false;
	isRatingFieldOpen = false;

	constructor(private usersFacade: UsersFacade, private store: Store<CoursesState>) {}

	ngOnInit(): void {
		this.getAuthor();
		this.getLoggedUser();

		this.rating = Math.round((this.course.ratings.reduce((a, b) => a + b, 0) / this.course.ratings.length) * 10) / 10;
	}

	getAuthor(): void {
		this.usersFacade.getUser(this.course.adminId).subscribe((response) => {
			this.author = response;
		});
	}

	getLoggedUser(): void {
		this.usersFacade.getLoggedUser().subscribe((response) => {
			this.loggedUser = response;

			if (this.loggedUser) {
				this.isCourseFavourited = this.course.favouritedBy.includes(this.loggedUser.id);
				this.isCourseRated = this.loggedUser.ratedCourses.includes(this.course.id);
			}
		});
	}

	onDelete(): void {
		if (!confirm('Are you sure you want to delete this post?')) {
			return;
		}

		this.store.dispatch(CoursesActions.deleteCourse({ payload: this.course.id }));
	}

	onOpenRatingField(): void {
		if (this.isCourseRated) {
			return;
		} else {
			this.isRatingFieldOpen = !this.isRatingFieldOpen;
		}
	}

	onRate(): void {
		if (this.newRating > 10 || this.newRating < 1) {
			alert('Invalida rating');
			this.isRatingFieldOpen = false;

			return;
		}

		const updatedCourse: Course = {
			...this.course,
			ratings: [...this.course.ratings, this.newRating],
		};

		const updatedUser: User = {
			...this.loggedUser,
			ratedCourses: [...this.loggedUser.ratedCourses, this.course.id],
		};

		this.store.dispatch(CoursesActions.updateCourse({ payload: updatedCourse }));
		setTimeout(() => {
			this.usersFacade.updateUser(updatedUser);
		}, 2000);
	}

	onFavourite(): void {
		if (this.isCourseFavourited) {
			const updatedCourse: Course = {
				...this.course,
				favouritedBy: this.course.favouritedBy.filter((id) => id !== this.loggedUser.id),
			};

			this.store.dispatch(CoursesActions.updateCourse({ payload: updatedCourse }));
		} else {
			const updatedCourse: Course = {
				...this.course,
				favouritedBy: [...this.course.favouritedBy, this.loggedUser.id],
			};

			this.store.dispatch(CoursesActions.updateCourse({ payload: updatedCourse }));
		}
	}
}
