import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { WanderSearchComponent } from './wander-search/wander-search.component';
import { WanderResultsComponent } from './wander-results/wander-results.component';


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
