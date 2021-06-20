import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {
  url: string;

  constructor(private storageService: StorageService) {
    this.storageService.getUrl().then(url => {
      this.url = url;
    });
  }

  updateUrl() {
    this.storageService.setUrl(this.url);    
  }
}
