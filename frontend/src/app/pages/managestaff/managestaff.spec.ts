import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Managestaff } from './managestaff';

describe('Managestaff', () => {
  let component: Managestaff;
  let fixture: ComponentFixture<Managestaff>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Managestaff]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Managestaff);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
