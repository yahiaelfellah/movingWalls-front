import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, HostListener } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  searchText: string = '';
  selectedLocation:string='';
  previous: string;
  locations: any = [];
  elements: any = [];
  dates: any = [];
  sort: any = [];
  constructor(private cdRef: ChangeDetectorRef) { }

  @HostListener('input') oninput() { this.searchItems(); }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.locations = ["Tunisia",
      "France"]

    this.dates = [
      "last day",
      "today",
    ]
    this.sort = [
      "completed first"
    ]
    for (let i = 1; i <= 10; i++) {
      this.elements.push({
        name: 'Wpis' + (Math.floor(Math.random() * i * 10)).toString(),
        status: 'completed',
        dateBegin: new Date(),
        dateEnd: new Date()
      });
    }
    this.mdbTable.setDataSource(this.elements);
    this.previous = this.mdbTable.getDataSource();
  }


  private searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }


}
