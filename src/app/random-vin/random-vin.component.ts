import { Component, OnInit } from '@angular/core';
import _QRCode from 'qrcode';
import LazyVin from 'lazy-vin-lib';
import { NhtsaService, VPIC_VARIABLE_IDS } from '../nhtsa/nhtsa.service';
import { fadeInOutTrigger } from '../shared/animations/triggers';
import { MatSnackBar } from '@angular/material';

export interface IRandomVinVehicleInfo {
  ModelYear: string;
  Model: string;
  Make: string;
}

@Component({
  selector: 'app-random-vin',
  templateUrl: './random-vin.component.html',
  styleUrls: ['./random-vin.component.scss'],
  animations: [
    fadeInOutTrigger
  ]
})
export class RandomVinComponent implements OnInit {
  public randomVin: string;
  public base64Image: string;
  public vehicleInfo: IRandomVinVehicleInfo;
  private lazyVin: LazyVin;
  private QRCode;

  constructor(private nhtsa: NhtsaService, private snackBar: MatSnackBar) {
    this.lazyVin = new LazyVin();
    this.QRCode = _QRCode;
  }

  public ngOnInit() {
    this.getQrCode();
  }

  public getQrCode() {
    this.vehicleInfo = undefined;
    this.setRandomVin();
    this.getQrCodeDataUrl(this.randomVin)
      .then(url => {
        this.base64Image = url;
        this.getVehicleInfo();
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

  public get imageSearchUrl(): string {
    if (!this.vehicleInfo || !this.vehicleInfo.ModelYear) {
      return;
    }
    return encodeURI(`https://www.google.com/search?tbm=isch&q=${this.vehicleInfoText}`);
  }

  public getQrCodeDataUrl(data: string): Promise<string> {
    return this.QRCode.toDataURL(data);
  }

  public copyVinToClipboard(): void {
    const mockElement = document.createElement('textarea');
    mockElement.style.opacity = '0';
    mockElement.style.position = 'absolute';
    mockElement.value = this.randomVin;
    document.body.appendChild(mockElement);
    mockElement.select();
    const success = this.tryToCopyVin(mockElement);
    if (success) {
      return this.showSnackBarMessage(`Copied ${this.randomVin} to the clipboard.`);
    }
    return this.showSnackBarMessage('Unable to copy the vin to the clipboard.');
  }

  public showSnackBarMessage(message: string): void {
    this.snackBar.open(message, 'Dismiss', { duration: 1500 });
  }

  public get validCheckDigit(): boolean {
    return this.lazyVin.fixCheckDigit(this.randomVin) === this.randomVin;
  }

  public get vehicleInfoText() {
    return this.vehicleInfo ? `${this.vehicleInfo.ModelYear} ${this.vehicleInfo.Make} ${this.vehicleInfo.Model}` : '';
  }

  public get shouldShowVehicleInfoText() {
    return this.vehicleInfo && this.vehicleInfo.ModelYear;
  }

  private getVehicleInfo() {
    this.nhtsa.decodeVin(this.randomVin).subscribe((data) => {
      const vinInfoArray = data.Results;
      // console.log(vinInfoArray);
      const desiredProps = [VPIC_VARIABLE_IDS.modeYear, VPIC_VARIABLE_IDS.make, VPIC_VARIABLE_IDS.model];
      this.vehicleInfo = this.nhtsa.getDesiredPropsAsObject<IRandomVinVehicleInfo>(vinInfoArray, desiredProps);
      // console.warn(this.vehicleInfo);
    });
  }

  private tryToCopyVin(vinElement: HTMLElement): boolean {
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        return true;
      }
    } catch (err) {
      console.error(err);
    } finally {
      document.body.removeChild(vinElement);
    }
    return false;
  }
}
