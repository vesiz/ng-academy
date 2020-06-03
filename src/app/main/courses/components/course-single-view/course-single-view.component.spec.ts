import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSingleViewComponent } from './course-single-view.component';

describe('CourseSingleViewComponent', () => {
	let component: CourseSingleViewComponent;
	let fixture: ComponentFixture<CourseSingleViewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CourseSingleViewComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CourseSingleViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
