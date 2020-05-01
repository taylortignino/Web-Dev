import { Component, OnInit } from '@angular/core';
import {MatrixServiceService} from '../../matrix-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {

  newMatrix;
  newTranspose;
  newSquare;
  input=false;
  square=false;


  constructor(private matrixService: MatrixServiceService,
              private router: Router) {
    this.newMatrix = matrixService.matrix;
    this.newTranspose = matrixService.transpose;
    this.newSquare = matrixService.square;
    this.input = matrixService.input;
    this.square = matrixService.isSquare;
  }


  ngOnInit() {
  }

  submit(){
    this.matrixService.input=false;
    this.matrixService.isSquare=false;
    this.router.navigate(['']);
  }
}
