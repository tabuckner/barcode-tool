import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckDigitValidatorComponent } from './check-digit-validator.component';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { VinDisplayComponent } from './vin-display/vin-display.component';

const routes: Routes = [
  { path: '', component: CheckDigitValidatorComponent }
];

@NgModule({
  declarations: [
    CheckDigitValidatorComponent,
    VinDisplayComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CheckDigitValidatorModule { }
