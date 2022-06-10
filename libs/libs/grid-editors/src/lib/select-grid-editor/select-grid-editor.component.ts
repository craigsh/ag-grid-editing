import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';

type ParamsOptions = {
	options: string[];
};

@Component({
	template: `<mat-card>
		<div class="container" #group tabindex="0">
			<mat-form-field>
				<mat-select #select panelClass="ag-custom-component-popup" [(ngModel)]="selectedOption">
					<mat-option *ngFor="let option of options" [value]="option">
						{{ option }}
					</mat-option>
				</mat-select>
			</mat-form-field>
		</div>
	</mat-card>`,
	styles: [
		`
			.container {
				width: 100%;
			}

			mat-card {
				padding: 0 0.5rem;
			}
		`,
	],
})
export class SelectGridEditorComponent implements ICellEditorAngularComp, AfterViewInit {
	@ViewChild('select') select!: MatSelect;

	options!: string[];
	selectedOption!: string;

	private selectedIndex!: number;
	private params!: ICellEditorParams & ParamsOptions;

	agInit(params: ICellEditorParams & ParamsOptions): void {
		this.params = params;

		this.selectedOption = this.params.value;
		this.options = this.params.options;

		this.selectedIndex = this.options.findIndex((item) => {
			return item === this.params.value;
		});
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.select?.focus();
		});
		this.selectOptionBasedOnIndex();
	}

	getValue() {
		return this.selectedOption;
	}

	isPopup(): boolean {
		return true;
	}

	private selectOptionBasedOnIndex() {
		this.selectedOption = this.options[this.selectedIndex];
	}
}

@NgModule({
	imports: [CommonModule, MatCardModule, MatFormFieldModule, MatSelectModule, FormsModule],
	declarations: [SelectGridEditorComponent],
	exports: [SelectGridEditorComponent],
})
export class SelectGridEditorComponentModule {}
