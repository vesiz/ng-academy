import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
	declarations: [MainComponent, NotFoundComponent, HeaderComponent],
	imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
