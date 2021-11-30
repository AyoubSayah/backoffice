import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiuserComponent } from './ediuser.component';

describe('EdiuserComponent', () => {
  let component: EdiuserComponent;
  let fixture: ComponentFixture<EdiuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdiuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdiuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
