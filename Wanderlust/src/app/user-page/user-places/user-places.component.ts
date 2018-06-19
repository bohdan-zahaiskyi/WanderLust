import { Component, OnInit } from '@angular/core';
import {WandersService} from '../../_services/wanders.service';
import {LocalService} from '../../_services/local.service';

@Component({
  selector: 'app-user-places',
  templateUrl: './user-places.component.html',
  styleUrls: ['./user-places.component.css']
})
export class UserPlacesComponent implements OnInit {
  markers = [];
  constructor(private _wanderService: WandersService, private _localService: LocalService) { }

  ngOnInit() {
    try{
      const completed = [];
      const today = new Date();
      const uluru = {lat: 49.839683, lng: 24.029717};
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: uluru
      });
      this._wanderService.getMyWanders(this._localService.getLocalUser().email).then(data => {
        data.filteredWanders.forEach(wanderRes => {
          const wander = wanderRes.wander;
          const wanderDate = new Date(wander.endDate);
          if (today.getTime() > wanderDate.getTime()) {
            completed.push(wander);
          }
        });
      }).then(() => {
        completed.forEach(wander => {
          wander.destinations.forEach(destination => {
            this._wanderService.getPlace(destination).then(place => {
              console.log(place);
              this.markers.push(new window.google.maps.Marker({
                position: place.results[0].geometry.location,
                map: map
              }));
            });
          });
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

}
