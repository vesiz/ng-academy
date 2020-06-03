import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Course } from 'src/app/shared/models/course.model';
import * as CoursesActions from '../../courses-store/courses.actions';
import * as CoursesSelectors from '../../courses-store/courses.selectors';
import { CoursesState } from '../../courses-store/courses.state';

@Component({
	selector: 'app-course-single-view',
	templateUrl: './course-single-view.component.html',
	styleUrls: ['./course-single-view.component.scss'],
})
export class CourseSingleViewComponent implements OnInit {
	course: Course;

	constructor(
		private route: ActivatedRoute, //
		private router: Router,
		private store: Store<CoursesState>
	) {}

	ngOnInit(): void {
		const id = parseInt(this.route.snapshot.params.id, 10);

		if (typeof id !== 'number') {
			this.router.navigate(['/not-found']);

			return;
		}

		this.store.pipe(select(CoursesSelectors.selectCourse, { id: id })).subscribe((response) => {
			this.course = response;
		});
	}
}
