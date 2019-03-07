import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'barcode-tool';

  constructor(private http: HttpClient) {
    this.http.get('https://randomvin.com/getvin.php?type=real').subscribe(data => console.log(data));
  }
}
