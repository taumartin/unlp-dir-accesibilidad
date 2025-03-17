import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmAyudantiasComponent } from './abm-ayudantias.component';

describe('AbmAyudantiasComponent', () => {
  let component: AbmAyudantiasComponent;
  let fixture: ComponentFixture<AbmAyudantiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmAyudantiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmAyudantiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
