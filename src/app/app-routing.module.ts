import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { NonauthGuard } from './auth/guards/non-auth.guard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
		canLoad: [NonauthGuard],
	},
	{
		path: '',
		loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
		canLoad: [AuthGuard],
	},
	{
		path: '**',
		redirectTo: '/',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
