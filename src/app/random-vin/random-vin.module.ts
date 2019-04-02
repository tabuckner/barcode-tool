import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomVinComponent } from './random-vin.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: RandomVinComponent }
]

@NgModule({
  declarations: [RandomVinComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule
  ]
})
export class RandomVinModule { }
