import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './components/courses/courses.component';

const routes: Routes = [
	{
		path: '',
		component: CoursesComponent,
		children: [],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CoursesRoutingModule {}
