import { Component, OnInit } from '@angular/core';
import _QRCode from 'qrcode';
import LazyVin from 'lazy-vin-lib';


@Component({
  selector: 'app-random-vin',
  templateUrl: './random-vin.component.html',
  styleUrls: ['./random-vin.component.scss']
})
export class RandomVinComponent implements OnInit {
  public randomVin: string;
  public base64Image: string;
  private lazyVin: LazyVin;
  private QRCode;

  constructor() {
    this.lazyVin = new LazyVin();
    this.QRCode = _QRCode;
  }

  public ngOnInit() {
    this.getQrCode();
  }

  public getQrCode() {
    this.setRandomVin();
    this.getQrCodeDataUrl(this.randomVin)
      .then(url => {
        this.base64Image = url;
      })
      .catch(err => {
        console.error(err);
      });
  }

  public setRandomVin() {
    const validVin = this.lazyVin.getRandomValidVin();
    const safeVin = this.lazyVin.fixCheckDigit(validVin);
    this.randomVin = safeVin;
  }

  public getQrCodeDataUrl(data: string): Promise<string> {
    return this.QRCode.toDataURL(data);
  }

  public get validCheckDigit(): boolean {
    return this.lazyVin.fixCheckDigit(this.randomVin) === this.randomVin;
  }
}
