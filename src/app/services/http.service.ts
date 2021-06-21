import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GraphRequest } from '../models/graph-request';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url = 'http://4780cd263fa9.ngrok.io';

  constructor(private http: HttpClient) {}

  setUrl(url: string): void {
    this.url = url;
  }

  getGraph() {
    const requestUrl = `${this.url}/get_sensor_values`;
    return this.http.get<GraphRequest>(requestUrl);
  }

  getImage() {
    const requestUrl = `${this.url}/get_image`;
    return this.http.get(requestUrl);
  }
}
