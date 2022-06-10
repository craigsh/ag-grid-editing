import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, CellClickedEvent } from 'ag-grid-community';
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
			<button (click)="clearSelection()">Clear Selection</button>
		</div>

		<!-- AG Grid Angular Component -->
		<ag-grid-angular
			style="width: 100%; height: 100%"
			class="ag-theme-alpine"
			[columnDefs]="columnDefs"
			[defaultColDef]="defaultColDef"
			[rowData]="rowData$ | async"
			[rowSelection]="'multiple'"
			[animateRows]="true"
			(gridReady)="onGridReady($event)"
			(cellClicked)="onCellClicked($event)"
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
			}
		`,
	],
})
export class AppComponent {
	// Each Column Definition results in one Column.
	public columnDefs: ColDef[] = [{ field: 'make' }, { field: 'model' }, { field: 'price' }];

	// DefaultColDef sets props common to all Columns
	public defaultColDef: ColDef = {
		sortable: true,
		filter: true,
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

	// Example of consuming Grid Event
	onCellClicked(e: CellClickedEvent): void {
		console.log('cellClicked', e);
	}

	// Example using Grid's API
	clearSelection(): void {
		this.agGrid.api.deselectAll();
	}
}
