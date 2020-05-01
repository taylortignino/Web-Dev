import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormComponent } from './components/form/form.component';
import { MatrixComponent } from './components/matrix/matrix.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatrixServiceService} from './matrix-service.service';
import {AppRoutingModule} from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormComponent,
    MatrixComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [MatrixServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
