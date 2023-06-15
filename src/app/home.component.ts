import { Component, OnInit } from '@angular/core';
import { CustomManifest, PluginOptions } from './mf.model';
import { getManifest } from '@angular-architects/module-federation';
import { ShareLibService } from 'share-lib';

@Component({
  selector: 'app-home',
  template: `
    <p>Home Works!</p>

    <div *ngFor="let p of options">
      <div class="col-md-4">
        <app-load-fragments [options]="p"></app-load-fragments>
      </div>
    </div>

    <button (click)="sendData()"> Send data to remote mfe</button>

    {{name$ | async}}
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  options: PluginOptions[] = [];
  name$ = this.shareLib.name$;


  constructor(private readonly shareLib: ShareLibService) {}

  ngOnInit(): void {
    const manifest = getManifest<CustomManifest>();


    // filter remote mfe's which needs to loaded inside page (not via route)
    this.options = Object.values(manifest).filter(
      (v) => v.withInPage === true
    ) as PluginOptions[];
  }

  sendData() {
    this.shareLib.addName('shell');
  }
}
