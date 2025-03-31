import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmTutoresTrabajosEnMaterialesComponent } from './abm-tutores-trabajos-en-materiales.component';

describe('AbmTutoresTrabajosEnMaterialesComponent', () => {
  let component: AbmTutoresTrabajosEnMaterialesComponent;
  let fixture: ComponentFixture<AbmTutoresTrabajosEnMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmTutoresTrabajosEnMaterialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmTutoresTrabajosEnMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
