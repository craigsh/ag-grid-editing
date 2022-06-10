import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGridEditorComponent } from './select-grid-editor.component';

describe('SelectGridEditorComponent', () => {
	let component: SelectGridEditorComponent;
	let fixture: ComponentFixture<SelectGridEditorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SelectGridEditorComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SelectGridEditorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
