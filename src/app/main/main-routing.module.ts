import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainComponent } from './main.component';

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{
				path: 'courses',
				loadChildren: () => import('./courses/courses.module').then((m) => m.CoursesModule),
			},
			{
				path: 'profile',
				loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
			},
			{
				path: 'not-found',
				component: NotFoundComponent,
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'courses',
			},
			{
				path: '**',
				redirectTo: '/not-found',
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MainRoutingModule {}
