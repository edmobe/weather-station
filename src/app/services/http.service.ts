import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GraphRequest } from '../models/graph-request';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url = 'https://b53b5d7d4e44.ngrok.io';

  constructor(private http: HttpClient) {}

  setUrl(url: string): void {
    this.url = url;
  }

  getGraph() {
    const requestUrl = `${this.url}/get_sensorValues`;
    return this.http.get<GraphRequest>(requestUrl);
  }

  getImage() {
    const requestUrl = `${this.url}/get_image`;
    return this.http.get(requestUrl);
  }
}
