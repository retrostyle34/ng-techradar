import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.scss']
})
export class TypeListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onAdd() {
     this.router.navigate(['settings/type/add']);
  }
}
