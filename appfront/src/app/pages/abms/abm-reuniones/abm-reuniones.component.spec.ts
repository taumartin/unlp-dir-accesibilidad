import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmReunionesComponent } from './abm-reuniones.component';

describe('AbmReunionesComponent', () => {
  let component: AbmReunionesComponent;
  let fixture: ComponentFixture<AbmReunionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmReunionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmReunionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
