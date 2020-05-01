import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormComponent} from '../components/form/form.component';
import {MatrixComponent} from '../components/matrix/matrix.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: FormComponent},
  {path: 'matrix', pathMatch: 'full', component: MatrixComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
