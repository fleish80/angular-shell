import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page.component';
import { HomeComponent } from './home.component';
import { MfeService } from './mfe.service';
import { LoadFragmentsComponent } from './load-fragments.component';

@NgModule({
  declarations: [AppComponent, LandingPageComponent, HomeComponent, LoadFragmentsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    // Add APP_INITIALIZER
    {
      provide: APP_INITIALIZER,
      useFactory: (mfeService: MfeService) => () => mfeService.init(),
      deps: [MfeService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
