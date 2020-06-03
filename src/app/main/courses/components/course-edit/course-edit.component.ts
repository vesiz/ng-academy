import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { UsersFacade } from 'src/app/main/users/facades/users.facade';
import { Course } from 'src/app/shared/models/course.model';
import { User } from 'src/app/shared/models/user.model';
import * as CoursesSelectors from '../../courses-store/courses.selectors';
import { CoursesState } from '../../courses-store/courses.state';
import { CoursesService } from '../../services/courses.service';

@Component({
	selector: 'app-course-edit',
	templateUrl: './course-edit.component.html',
	styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit {
	editMode = false;
	loggedUser: User;
	courseForm: FormGroup;
	id: number;
	currentCourse: Course;

	destroy$ = new Subject<boolean>();

	constructor(
		private route: ActivatedRoute, //
		private router: Router,
		private fb: FormBuilder,
		private usersFacade: UsersFacade,
		private coursesService: CoursesService,
		private store: Store<CoursesState>
	) {}

	ngOnInit(): void {
		this.editMode = this.route.routeConfig.path.includes('edit');

		if (!this.editMode) {
			this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
				this.id = data.id;
			});

			this.buildForm();
		} else {
			this.id = parseInt(this.route.snapshot.params.id, 10);
			this.getCourses();
		}

		this.getLoggedUser();
	}

	getLoggedUser(): void {
		this.usersFacade
			.getLoggedUser()
			.pipe(takeUntil(this.destroy$))
			.subscribe((response) => {
				this.loggedUser = response;

				if (this.loggedUser) {
					if (!this.loggedUser.adminRights) {
						this.router.navigate(['/not-found']);
					}
				}
			});
	}

	getCourses(): void {
		this.store.pipe(select(CoursesSelectors.selectCourses)).subscribe((response) => {
			if (response.length !== 0) {
				this.currentCourse = response.filter((course) => course)[0];
				this.buildForm();
			}
		});
	}

	buildForm(): void {
		let title = '';
		let description = '';
		let coverImage = '';

		if (this.editMode) {
			title = this.currentCourse.title;
			description = this.currentCourse.description;
			coverImage = this.currentCourse.coverImage;
		}

		this.courseForm = this.fb.group({
			title: [title, [Validators.required]],
			description: [description, [Validators.required]],
			coverImage: [coverImage, [Validators.required]],
		});
	}

	onSubmit(): void {
		let course: Course = null;

		if (this.editMode) {
			course = {
				id: this.currentCourse.id,
				title: this.courseForm.value.title,
				description: this.courseForm.value.description,
				coverImage: this.courseForm.value.coverImage,
			};

			this.coursesService.updateCourse(course).pipe(takeUntil(this.destroy$)).subscribe();
		} else {
			course = {
				id: this.id,
				title: this.courseForm.value.title,
				description: this.courseForm.value.description,
				coverImage: this.courseForm.value.coverImage,
				adminId: this.loggedUser.id,
				date: new Date().getTime(),
				favouritedBy: [],
				ratings: [],
			};

			this.coursesService.addCourse(course).pipe(takeUntil(this.destroy$)).subscribe();
		}

		this.navigateToMain();
	}

	onCancel(): void {
		if (this.courseForm.touched) {
			if (confirm('Do you want to leave the page? Your changes will not be saved.')) {
				this.navigateToMain();
			}
		} else {
			this.navigateToMain();
		}
	}

	navigateToMain(): void {
		this.courseForm.reset();
		this.router.navigate(['/courses']);
	}
}
