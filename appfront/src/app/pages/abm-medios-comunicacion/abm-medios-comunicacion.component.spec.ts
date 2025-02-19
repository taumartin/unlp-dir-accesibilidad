import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmMediosComunicacionComponent } from './abm-medios-comunicacion.component';

describe('AbmMediosComunicacionComponent', () => {
  let component: AbmMediosComunicacionComponent;
  let fixture: ComponentFixture<AbmMediosComunicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmMediosComunicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmMediosComunicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
