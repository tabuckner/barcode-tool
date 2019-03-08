import { Component, OnInit } from '@angular/core';
import _QRCode from 'qrcode';
import LazyVin from 'lazy-vin-lib';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Barcode Tool';
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
    const cleanVin = this.lazyVin.getRandomCleanVin();
    this.randomVin = cleanVin;
  }

  public getQrCodeDataUrl(data: string): Promise<string> {
    return this.QRCode.toDataURL(data);
  }
}
