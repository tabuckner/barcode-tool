import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'VIN Tools';
  public version = environment.version;
  public timestamp = environment.deployTimestamp;
  public navLinks = [
  {
    path: '/random-vin',
    label: 'Get VIN'
  },
  {
    path: '/check-digit-validator',
    label: 'Check Digit Validation'
  }
];

}
