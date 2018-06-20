import {Component, OnInit} from '@angular/core';
import {WandersService} from '../_services/wanders.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css']
})
export class MainPageComponent implements OnInit {
    constructor(private _wanderService: WandersService) {}
    wanderSearchResults: any = {};
    latestWanders: any;
    topDestinations: any;
    vasa = [
      {destination: 'Lviv', priority: 3},
      {destination: 'Oslo', priority: 3},
      {destination: 'Paris', priority: 2},
      {destination: 'Rome', priority: 1},
      {destination: 'Kyiv', priority: 1},
      {destination: 'New York', priority: 1}
    ];
    maps = [];

    wanderSearchReporter(report: any) {
      this.wanderSearchResults = report;
      // Object.assign(this.wanderSearchResults, report);
    }
    show() {
      console.log(this.wanderSearchResults);
    }
    ngOnInit() {
      const map0 = new window.google.maps.Map(document.getElementById('map-0'), {
        zoom: 5,
        center: {lat: 49.839683, lng: 24.029717}
      });
      const marker0 = new window.google.maps.Marker({
        position: {lat: 49.839683, lng: 24.029717},
        map: map0
      });
      const map1 = new window.google.maps.Map(document.getElementById('map-1'), {
        zoom: 5,
        center: {lat: 59.9138688, lng: 10.7522454}
      });
      const marker1 = new window.google.maps.Marker({
        position: {lat: 59.9138688, lng: 10.7522454},
        map: map1
      });
      const map2 = new window.google.maps.Map(document.getElementById('map-2'), {
        zoom: 5,
        center: {lat: 48.856614, lng: 2.3522219}
      });
      const marker2 = new window.google.maps.Marker({
        position: {lat: 48.856614, lng: 2.3522219},
        map: map2
      });
      const map3 = new window.google.maps.Map(document.getElementById('map-3'), {
        zoom: 5,
        center: {lat: 41.9027835, lng: 12.4963655}
      });
      const marker3 = new window.google.maps.Marker({
        position: {lat: 41.9027835, lng: 12.4963655},
        map: map3
      });
      const map4 = new window.google.maps.Map(document.getElementById('map-4'), {
        zoom: 5,
        center: {lat: 50.4501, lng: 30.5234}
      });
      const marker4 = new window.google.maps.Marker({
        position: {lat: 50.4501, lng: 30.5234},
        map: map4
      });
      const map5 = new window.google.maps.Map(document.getElementById('map-5'), {
        zoom: 5,
        center: {lat: 40.7127753, lng: -74.0059728}
      });
      const marker5 = new window.google.maps.Marker({
        position: {lat: 40.7127753, lng: -74.0059728},
        map: map5
      });
      this.latestWanders = {};
      this.topDestinations = [];
      this._wanderService.getLatest().then(wanders => {
        const filteredWanders = [];
        wanders.forEach(wander => {
          filteredWanders.push({wander: wander, priority: 1});
        });
        this.latestWanders = {searchResults: filteredWanders || null};
      });
      this._wanderService.getTopDestinations().then(dests => {
        this.topDestinations = dests;
      });
    }
}
