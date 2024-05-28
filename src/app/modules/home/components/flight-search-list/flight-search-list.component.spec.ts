import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchListComponent } from './flight-search-list.component';

describe('FlightSearchListComponent', () => {
  let component: FlightSearchListComponent;
  let fixture: ComponentFixture<FlightSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightSearchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
