import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UsersEffects } from './users-store/users.effects';
import * as fromUsers from './users-store/users.reducer';

@NgModule({
	declarations: [],
	imports: [
		CommonModule, //
		StoreModule.forFeature(fromUsers.usersFeatureKey, fromUsers.reducer),
		EffectsModule.forFeature([UsersEffects]),
	],
})
export class UsersModule {}
