import { Component, OnInit, inject } from '@angular/core';
import { CustomManifest, PluginOptions } from './mf.model';
import { getManifest } from '@angular-architects/module-federation';
import { ShareLibService, SharedPlatformService, SharedRootService } from 'share-lib';

@Component({
  selector: 'app-home',
  template: `
    <p>Home Works!</p>

    <div *ngFor="let p of options">
      <div class="col-md-4">
        <app-load-fragments [options]="p"></app-load-fragments>
      </div>
    </div>

    <ul>
      <li><button (click)="sendData()">Send data to shared service</button></li>
      <li>
        <button (click)="sendText()">Send data to platform service</button>
      </li>
      <li><button (click)="sendToRoot()">Send data to root service</button></li>
    </ul>
    <ul>
      <li>{{ sharedText$ | async }}</li>
      <li>{{ platformText$ | async }}</li>
      <li>{{ rootText$ | async }}</li>
    </ul>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  options: PluginOptions[] = [];
  
  #shareLibService = inject(ShareLibService);
  #sharedPlatformService = inject(SharedPlatformService);
  #sharedRootService = inject(SharedRootService);

  sharedText$ = this.#shareLibService.text$;
  platformText$ = this.#sharedPlatformService.text$;
  rootText$ = this.#sharedRootService.text$;



  constructor(private readonly shareLib: ShareLibService) {}

  ngOnInit(): void {
    const manifest = getManifest<CustomManifest>();

    // filter remote mfe's which needs to loaded inside page (not via route)
    this.options = Object.values(manifest).filter(
      (v) => v.withInPage === true
    ) as PluginOptions[];
  }

  sendData() {
    this.#shareLibService.addName('mfe shell');
  }

  sendText() {
    this.#sharedPlatformService.addName('mfe shell');
  }

  sendToRoot() {
    this.#sharedRootService.addName('mfe shell');
  }
}
