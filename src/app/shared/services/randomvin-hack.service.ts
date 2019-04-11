import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const RANDOM_VIN_BASE_URL = 'http://randomvin.com';
const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class RandomvinHackService {

  constructor(private http: HttpClient) {}

  public getRandomRealVin(): Observable<string> {
    const headers = new HttpHeaders();
    headers.append('Origin', RANDOM_VIN_BASE_URL);
    return this.http.get(`${CORS_PROXY_URL}/${RANDOM_VIN_BASE_URL}/getvin.php?type=real`, { headers, responseType: 'text' });
  }
}
