import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipeStartComponent } from './receipe-start.component';

describe('ReceipeStartComponent', () => {
  let component: ReceipeStartComponent;
  let fixture: ComponentFixture<ReceipeStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceipeStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceipeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
