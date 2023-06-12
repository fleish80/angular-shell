import { getManifest } from '@angular-architects/module-federation';
import { Component, OnInit } from '@angular/core';
import { CustomManifest, CustomRemoteConfig } from './mf.model';
@Component({
  selector: 'app-landing-page',
  template: `
    <div>
      <ul class="navbar-nav">
        <!-- static links -->
        <li class="nav-item">
          <a class="nav-link" routerLink="/home" routerLinkActive="active"
            >Home</a
          >
        </li>
        <!-- dynamic links from the mf.manifest.json -->
        <li *ngFor="let remote of remotes">
          <a
            class="nav-link"
            [routerLink]="remote.routePath"
            routerLinkActive="active"
            >{{ remote.displayName }}</a
          >
        </li>
      </ul>
    </div>
    <router-outlet/>
  `,
  styles: [``],
})
export class LandingPageComponent implements OnInit {
  remotes: CustomRemoteConfig[] = [];

  ngOnInit(): void {
    const manifest = getManifest<CustomManifest>(); // setManifest was called before in main.ts file
    console.log({manifest});
    this.remotes = Object.values(manifest).filter((v) => v.viaRoute === true);
  }
}
