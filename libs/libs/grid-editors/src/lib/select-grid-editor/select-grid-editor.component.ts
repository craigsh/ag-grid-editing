import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';

@Component({
	template: `<mat-card>
		<div class="container" #group tabindex="0" (keydown)="onKeyDown($event)">
			<mat-form-field>
				<mat-select panelClass="ag-custom-component-popup" [(ngModel)]="favouriteVegetable">
					<mat-option *ngFor="let vegetable of vegetables" [value]="vegetable">
						{{ vegetable }}
					</mat-option>
				</mat-select>
			</mat-form-field>
		</div>
	</mat-card>`,
	styles: [
		`
			.container {
				width: 190px;
				height: 48px;
			}

			.container:focus {
				outline: none;
			}
		`,
	],
})
export class SelectGridEditorComponent implements ICellEditorAngularComp, AfterViewInit {
	private params!: ICellEditorParams & { vegetables: string[] };

	public vegetables!: string[];
	public favouriteVegetable!: string;
	private selectedIndex!: number;

	@ViewChild('group', { read: ViewContainerRef })
	public group!: ViewContainerRef;

	agInit(params: ICellEditorParams & { vegetables: string[] }): void {
		this.params = params;

		this.favouriteVegetable = this.params.value;
		this.vegetables = this.params.vegetables;

		this.selectedIndex = this.vegetables.findIndex((item) => {
			return item === this.params.value;
		});
	}

	// Don't use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
	ngAfterViewInit() {
		window.setTimeout(() => {
			this.group.element.nativeElement.focus();
		});
		this.selectFavouriteVegetableBasedOnSelectedIndex();
	}

	private selectFavouriteVegetableBasedOnSelectedIndex() {
		this.favouriteVegetable = this.vegetables[this.selectedIndex];
	}

	getValue() {
		return this.favouriteVegetable;
	}

	isPopup(): boolean {
		return true;
	}

	/*
	 * A little over complicated for what it is, but the idea is to illustrate how you might navigate through the radio
	 * buttons with up & down keys (instead of finishing editing)
	 */
	onKeyDown(event: any): void {
		const key = event.key;
		if (key === 'ArrowUp' || key === 'ArrowDown') {
			this.preventDefaultAndPropagation(event);

			if (key == 'ArrowUp') {
				// up
				this.selectedIndex = this.selectedIndex === 0 ? this.vegetables.length - 1 : this.selectedIndex - 1;
			} else if (key == 'ArrowDown') {
				// down
				this.selectedIndex = this.selectedIndex === this.vegetables.length - 1 ? 0 : this.selectedIndex + 1;
			}
			this.selectFavouriteVegetableBasedOnSelectedIndex();
		}
	}

	private preventDefaultAndPropagation(event: any) {
		event.preventDefault();
		event.stopPropagation();
	}
}

@NgModule({
	imports: [CommonModule, MatCardModule, MatFormFieldModule, MatSelectModule, FormsModule],
	declarations: [SelectGridEditorComponent],
	exports: [SelectGridEditorComponent],
})
export class SelectGridEditorComponentModule {}
