import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	template: ` <p>select-grid-editor works!</p> `,
	styles: [],
})
export class SelectGridEditorComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}

@NgModule({
	imports: [CommonModule],
	declarations: [SelectGridEditorComponent],
	exports: [SelectGridEditorComponent],
})
export class SelectGridEditorComponentModule {}
