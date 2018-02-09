import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './main-page/app';
import { WanderSearchComponent } from './main-page/wander-search/wander-search';
import { WanderResultsComponent } from './main-page/wander-results/wander-results';


@NgModule({
  declarations: [
    AppComponent,
    WanderSearchComponent,
    WanderResultsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
