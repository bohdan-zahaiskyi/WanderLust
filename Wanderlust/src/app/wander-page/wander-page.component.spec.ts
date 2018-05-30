import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WanderPageComponent } from './wander-page.component';

describe('WanderPageComponent', () => {
  let component: WanderPageComponent;
  let fixture: ComponentFixture<WanderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WanderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WanderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
