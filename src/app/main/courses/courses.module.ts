import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoursesComponent } from './components/courses/courses.component';
import { CoursesRoutingModule } from './courses-routing.module';

const components = [
	CoursesComponent, //
];

@NgModule({
	declarations: [...components],
	imports: [
		CommonModule, //
		CoursesRoutingModule,
	],
	exports: [...components],
})
export class CoursesModule {}
