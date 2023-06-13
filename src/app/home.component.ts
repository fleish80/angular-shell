import { Component, OnInit } from '@angular/core';
import { CustomManifest, PluginOptions } from './mf.model';
import { getManifest } from '@angular-architects/module-federation';

@Component({
  selector: 'app-home',
  template: `
    <p>Home Works!</p>

    <div *ngFor="let p of options">
      <div class="col-md-4">
        <app-load-fragments [options]="p"></app-load-fragments>
      </div>
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  options: PluginOptions[] = [];
  constructor() {}
  ngOnInit(): void {
    const manifest = getManifest<CustomManifest>();

    // filter remote mfe's which needs to loaded inside page (not via route)
    this.options = Object.values(manifest).filter(
      (v) => v.withInPage === true
    ) as PluginOptions[];
  }
}
