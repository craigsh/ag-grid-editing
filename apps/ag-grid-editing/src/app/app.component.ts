import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { SelectGridEditorComponent } from '@craigsh/libs/grid-editors';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';

type Car = {
	make: string;
	model: string;
	price: number;
};

@Component({
	selector: 'craigsh-root',
	template: `
		<!-- Button to clear selection -->
		<div class="buttons">
			<button mat-raised-button (click)="clearSelection()">Clear Selection</button>

			<div class="theme-select">
				<label id="group-label">Pick theme</label>
				<mat-radio-group aria-labelledby="group-label" [(ngModel)]="themeClass">
					<mat-radio-button *ngFor="let cls of themeClasses" [value]="cls">
						{{ cls }}
					</mat-radio-button>
				</mat-radio-group>
			</div>
		</div>

		<!-- AG Grid Angular Component -->
		<ag-grid-angular
			style="width: 100%; height: 100%"
			[class]="themeClass"
			[columnDefs]="columnDefs"
			[defaultColDef]="defaultColDef"
			[rowData]="rowData$ | async"
			[rowSelection]="'multiple'"
			[animateRows]="true"
			[gridOptions]="gridOptions"
			(gridReady)="onGridReady($event)"
		></ag-grid-angular>
	`,
	styles: [
		`
			:host {
				padding: 0.5rem;
				display: grid;
				height: 100%;
				gap: 1rem;
				grid-template-rows: auto 1fr;

				.buttons {
					display: flex;
					align-items: center;

					.theme-select {
						padding-left: 1rem;
						label {
							margin-right: 1rem;
						}

						mat-radio-button {
							margin: 0.5rem;
						}
					}
				}
			}
		`,
	],
})
export class AppComponent {
	themeClasses = ['ag-theme-alpine', 'ag-theme-custom-angular'];
	themeClass = this.themeClasses[1];

	// Each Column Definition results in one Column.
	public columnDefs: ColDef[] = [
		{ field: 'make', headerName: 'Make' },
		{
			field: 'model',
			headerName: 'Model',
			editable: true,
			cellEditor: SelectGridEditorComponent,
			cellEditorParams: {
				options: ['Boxter', 'Celica', 'Mondeo', 'Sierra', 'Venga'],
			},
		},
		{ field: 'price', headerName: 'Price' },
	];

	// DefaultColDef sets props common to all Columns
	public defaultColDef: ColDef = {
		sortable: true,
		filter: true,
	};

	public gridOptions: GridOptions = {
		suppressClickEdit: false,
		stopEditingWhenCellsLoseFocus: true,
	};

	// Data that gets displayed in the grid
	public rowData$!: Observable<Car[]>;

	// For accessing the Grid's API
	@ViewChild(AgGridAngular) agGrid!: AgGridAngular;

	constructor(private http: HttpClient) {}

	// Example load data from sever
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onGridReady(params: GridReadyEvent) {
		this.rowData$ = this.http.get<Car[]>('https://www.ag-grid.com/example-assets/row-data.json');
	}

	// Example using Grid's API
	clearSelection(): void {
		this.agGrid.api.deselectAll();
	}
}
