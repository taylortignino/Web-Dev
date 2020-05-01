import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatrixServiceService} from '../../matrix-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  rowColForm;

  constructor(private formBuilder: FormBuilder,
              private matrixservice: MatrixServiceService,
              private router: Router) {

    this.rowColForm = this.formBuilder.group({
      row: ['', Validators.required],
      col: ['', Validators.required]

    });
  }


  ngOnInit() {
  }

  onSubmit(input) {

    const promise = Promise.resolve(this.matrixservice.makeMatrix(input.row, input.col));

    promise.then(res => {
      this.matrixservice.makeTranspose();
    }).then(res => {
      if(input.row === input.col){
        this.matrixservice.makeSquare();
      }
    }).then(res => {
      this.router.navigate(['matrix']);
    });



  }

}
