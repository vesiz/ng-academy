import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { CourseSingleViewComponent } from './components/course-single-view/course-single-view.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseIdResolver } from './resolvers/course-id.resolver';

const routes: Routes = [
	{
		path: '',
		component: CoursesComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: CoursesListComponent,
			},
			{
				path: 'new',
				pathMatch: 'full',
				resolve: { id: CourseIdResolver },
				component: CourseEditComponent,
			},
			{
				path: ':id/edit',
				component: CourseEditComponent,
				pathMatch: 'full',
			},
			{
				path: ':id',
				component: CourseSingleViewComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CoursesRoutingModule {}
