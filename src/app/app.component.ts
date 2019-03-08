import { Component, OnInit } from '@angular/core';
import _QRCode from 'qrcode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'barcode-tool';
  public randomVin: string;
  public base64Image: string;
  // private vinGenerator;
  private QRCode;

  constructor() {
    // this.vinGenerator = _VinGenerator;
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
    const dirtyVin = 'WDBEB28D6MB240164'; // TODO: Create a lazy library to serve a few options.
    let cleanVin = dirtyVin.substring(0, dirtyVin.length - 6);
    for (let i = 0; i < 6; i++) {
      cleanVin += Math.floor(Math.random() * 10);
    }
    console.log(cleanVin, cleanVin.length);
    this.randomVin = cleanVin;
  }

  public getQrCodeDataUrl(data: string): Promise<string> {
    return this.QRCode.toDataURL(data);
  }
}
