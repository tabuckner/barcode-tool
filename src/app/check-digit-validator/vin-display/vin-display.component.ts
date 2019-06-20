import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vin-display',
  templateUrl: './vin-display.component.html',
  styleUrls: ['./vin-display.component.scss']
})
export class VinDisplayComponent implements OnInit {
  @Input() public vin: string;

  constructor() { }

  ngOnInit() {
  }

  public get vinFirst(): string {
    return this.vin.substr(0, 8);
  }

  public get checkDigit(): string {
    if (this.vin.length < 9) {
      return '';
    } else {
      return this.vin.substr(8, 1);
    }
  }

  public get vinLast(): string {
    if (this.vin.length > 9) {
      return this.vin.substr(9);
    }
  }

}
