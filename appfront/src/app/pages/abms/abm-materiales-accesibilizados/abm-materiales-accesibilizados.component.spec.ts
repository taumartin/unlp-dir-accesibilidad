import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmMaterialesAccesibilizadosComponent } from './abm-materiales-accesibilizados.component';

describe('AbmMaterialesAccesibilizadosComponent', () => {
  let component: AbmMaterialesAccesibilizadosComponent;
  let fixture: ComponentFixture<AbmMaterialesAccesibilizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmMaterialesAccesibilizadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmMaterialesAccesibilizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
