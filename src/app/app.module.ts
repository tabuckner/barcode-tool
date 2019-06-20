import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatTabsModule, MatIconModule } from '@angular/material';

const routes: Routes = [
  { path: '', redirectTo: '/random-vin', pathMatch: 'full' },
  { path: 'random-vin', loadChildren: './random-vin/random-vin.module#RandomVinModule' },
  { path: 'check-digit-validator', loadChildren: './check-digit-validator/check-digit-validator.module#CheckDigitValidatorModule' },
  { path: '**', redirectTo: '/random-vin' } // TODO: Add 404 page.
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot( routes, {
      preloadingStrategy: PreloadAllModules
    }),
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
