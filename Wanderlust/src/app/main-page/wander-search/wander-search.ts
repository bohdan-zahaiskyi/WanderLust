import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WandersService} from '../../_services/wanders.service';

@Component({
  selector: 'app-wander-search',
  templateUrl: './wander-search.html',
  styleUrls: ['./wander-search.css']
})
export class WanderSearchComponent implements OnInit {

  constructor(private _wanderService: WandersService) { }
  @Output() searchReporter = new EventEmitter<any>();
  criteria: any;
  tag: string;
  tags = [];

  search() {
    const params = [];
    const keys = Object.keys(this.criteria);
    keys.forEach(key => {
      params.push({key, value: this.criteria[key]});
    });
    this._wanderService.searchWanders(params).then(data => {
      const searchResults = data.filteredWanders || null;
      this.searchReporter.emit({searchResults});
    });
  }

  addTag(e) {
    if (e.key === 'Enter') {
      this.tags.push(this.tag);
      this.tag = '';
    }
  }

  removeTag(tag) {
    const index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags.splice(index, 1);
    }
  }

  reset() {
    this.criteria = {};
  }
  get budget() {
    if (this.criteria.budgetFrom && this.criteria.budgetTo) {
      return this.criteria.budget[0] + ((this.criteria.budget[0] + this.criteria.budget[1]) / 2);
    }
    return 0;
  }

  set budget(value) {
    this.criteria.budget[0] = value - value * 0.1;
    this.criteria.budget[1] = value + value * 0.1;
  }

  ngOnInit() {
    this.criteria = {
      budget: [0, 0],
      destinations: ['', '']
    };
  }

}
