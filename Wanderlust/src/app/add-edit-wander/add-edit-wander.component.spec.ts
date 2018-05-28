import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWanderComponent } from './add-edit-wander.component';

describe('AddEditWanderComponent', () => {
  let component: AddEditWanderComponent;
  let fixture: ComponentFixture<AddEditWanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditWanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
