import { Component } from '@angular/core';
import { ImageRequest } from '../models/image-request';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  loaded = false;
  state: string;
  imageSource = '../../assets/loading.gif';

  constructor(httpService: HttpService) {
    httpService.getImage().subscribe({
      next: (imageRequest: ImageRequest) => {
        this.state = imageRequest.state;
        this.imageSource = 'data:image/png;base64,';
        this.imageSource += imageRequest.b64_encoded;
        this.loaded = true;
      },
      error: error => {
        console.error(error);
      }
    })
  }

}
