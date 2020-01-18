import { Component, OnInit, Input } from '@angular/core';
import * as  moment from 'moment';

@Component({
  selector: '[app-tablerow]',
  templateUrl: './tablerow.component.html',
  styleUrls: ['./tablerow.component.scss']
})
export class TablerowComponent implements OnInit {
  @Input() name: string;
  @Input() dateBegin: any;
  @Input()  status:string;
  @Input() dateEnd: any;
  
  private duration :string;
  constructor() {
    console.log(this.dateBegin)

   }

  ngOnInit() {
    this.duration = `${moment(this.dateBegin).format('ddd,MMM YYYY')} - ${moment(this.dateEnd).format('ddd,MMM YYYY')}`
  }

}
