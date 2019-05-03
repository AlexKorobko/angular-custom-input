import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  nestedForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl('')
  });

  constructor() {}

  ngOnInit(): void {}


}
