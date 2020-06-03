import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoursesModule } from '../courses/courses.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileOverviewComponent } from './components/profile-overview/profile-overview.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
	declarations: [ProfileComponent, EditProfileComponent, UsersListComponent, ProfileOverviewComponent],
	imports: [CommonModule, ProfileRoutingModule, CoursesModule],
})
export class ProfileModule {}
