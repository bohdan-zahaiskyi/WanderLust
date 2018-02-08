import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WanderSearchComponent } from './wander-search.component';

describe('WanderSearchComponent', () => {
  let component: WanderSearchComponent;
  let fixture: ComponentFixture<WanderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WanderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WanderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
