import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const NHTSA_API_BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevin';
const RESPONSE_FORMAT = 'json'; // TODO: Enumerate this.

export interface IDecodeVinResponse {
  Count: number;
  Message: string;
  Results: IDecodeVinResponseObject[]; // TODO: Type this.
  SearchCriteria: string;
}

export interface IDecodeVinResponseObject {
  Value: string; // TODO: Type this.
  ValueId: string;
  Variable: string;
  VariableId: number;
}

export enum VPIC_VARIABLE_IDS {
  modeYear = 29,
  make = 26,
  model = 28,
  trim = 38,
  vehicleType = 39,
  bodyClass = 5,
  driveType = 15,
  cylinders = 9,
  displacementLiters = 13,
  fuelType = 24
}

@Injectable({
  providedIn: 'root'
})
export class NhtsaService {

  constructor(private http: HttpClient) {}

  decodeVin(vin: string, format: string = RESPONSE_FORMAT): Observable<IDecodeVinResponse> {
    const url = `${NHTSA_API_BASE_URL}/${vin}?format=${format}`;
    return this.http.get<IDecodeVinResponse>(url);
  }

  getDesiredPropsAsObject<T>(vinInfoArray: IDecodeVinResponseObject[], desiredPropVariableIds: number[]): T {
    const desiredPropsObject = {} as T;
    vinInfoArray.map((element) => {
      if (desiredPropVariableIds.indexOf(element.VariableId) > -1) {
        desiredPropsObject[this.removeSpacesFromString(element.Variable)] = element.Value;
      }
    });
    return desiredPropsObject;
  }

  private removeSpacesFromString(theString: string): string {
    return theString.replace(/\s/g, '');
  }

}
