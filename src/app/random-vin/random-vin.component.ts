import { Component, OnInit } from '@angular/core';
import _QRCode from 'qrcode';
import LazyVin from 'lazy-vin-lib';
import { NhtsaService, VPIC_VARIABLE_IDS } from '../nhtsa/nhtsa.service';
import { fadeInOutTrigger } from '../shared/animations/triggers';

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
  public vehicleInfo: IRandomVinVehicleInfo; // TODO: Type this.
  private lazyVin: LazyVin;
  private QRCode;

  constructor(private nhtsa: NhtsaService) {
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

  public getQrCodeDataUrl(data: string): Promise<string> {
    return this.QRCode.toDataURL(data);
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
      console.log(vinInfoArray);
      const desiredProps = [VPIC_VARIABLE_IDS.modeYear, VPIC_VARIABLE_IDS.make, VPIC_VARIABLE_IDS.model];
      this.vehicleInfo = this.nhtsa.getDesiredPropsAsObject<IRandomVinVehicleInfo>(vinInfoArray, desiredProps);
      console.warn(this.vehicleInfo);
    });
  }
}
