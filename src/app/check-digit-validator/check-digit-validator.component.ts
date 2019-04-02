import { Component, OnInit } from '@angular/core';
import _QRCode from 'qrcode';
import LazyVin from 'lazy-vin-lib';

@Component({
  selector: 'app-check-digit-validator',
  templateUrl: './check-digit-validator.component.html',
  styleUrls: ['./check-digit-validator.component.scss']
})
export class CheckDigitValidatorComponent implements OnInit {
  public checkDigitIsValid: boolean;
  public vin = '';
  public correctVin: string;
  private lazyVin: LazyVin;

  constructor() {
    this.lazyVin = new LazyVin();
  }

  ngOnInit() {
  }

  public submit() {
    this.validate(this.vin);
  }

  public validate(vin: string) {
    this.reset();

    this.correctVin = this.lazyVin.fixCheckDigit(vin);
    if (vin !== this.correctVin) {
      return this.checkDigitIsValid = false;
    }
    return this.checkDigitIsValid = true;
  }

  public get status(): string {
    const vinIsEntered = this.vin && this.vin.length === 17;
    const wasSubmitted = this.correctVin;
    if (vinIsEntered && wasSubmitted && this.checkDigitIsValid) {
      return 'Check Digit is Valid';
    } else if (vinIsEntered && wasSubmitted && !this.checkDigitIsValid) {
      return 'Check Digit is Invalid';
    } else {
      return 'Status';
    }
  }

  public reset() {
    this.checkDigitIsValid = undefined;
    this.correctVin = undefined;
  }

}
