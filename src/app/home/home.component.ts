import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { DataFetcherService } from '../services/data-fetcher.service';
import { User } from '../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service: DataFetcherService) {
    
   }

   ngOnInit() {
    this.service.getUsers().subscribe((user) => {console.log(user)},(err) => { console.log(err)});
    this.service.getCompaign().subscribe( res => console.log(res),(err) => { console.log(err)})
  }

}
