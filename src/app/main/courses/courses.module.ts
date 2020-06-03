import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CourseSingleViewComponent } from './components/course-single-view/course-single-view.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesEffects } from './courses-store/courses.effects';
import * as fromCourses from './courses-store/courses.reducer';

const components = [
	CoursesComponent, //
	CoursesListComponent,
	CourseItemComponent,
	CourseEditComponent,
	CourseSingleViewComponent,
];

@NgModule({
	declarations: [...components],
	imports: [
		CommonModule, //
		CoursesRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		StoreModule.forFeature(fromCourses.coursesFeatureKey, fromCourses.reducer),
		EffectsModule.forFeature([CoursesEffects]),
	],
	exports: [...components],
})
export class CoursesModule {}
