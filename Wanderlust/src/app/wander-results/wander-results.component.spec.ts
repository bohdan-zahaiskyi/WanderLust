import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WanderResultsComponent } from './wander-results.component';

describe('WanderResultsComponent', () => {
  let component: WanderResultsComponent;
  let fixture: ComponentFixture<WanderResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WanderResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WanderResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
