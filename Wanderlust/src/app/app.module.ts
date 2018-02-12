import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';

import { WandersService } from './wanders.service';
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
    BrowserModule,
    HttpModule
  ],
  providers: [
    WandersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
