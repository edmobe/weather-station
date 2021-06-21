import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage, private httpService: HttpService) {}

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this.setUrl('http://a8f37e6a2434.ngrok.io').then((value) =>
      this.httpService.setUrl(value)
    );
  }

  async setUrl(value: string) {
    this.httpService.setUrl(value);
    return this._storage.set('url', value);
  }

  async getUrl() {
    return this._storage.get('url');
  }
}
