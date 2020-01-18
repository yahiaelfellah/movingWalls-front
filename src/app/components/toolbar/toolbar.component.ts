import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() currentUser:boolean;
  ngOnChange(change: SimpleChange){
    console.log(change);
  }
  ngOnInit() {
  }
  isLoggedIn() {
    return this.currentUser;
  }
}
