import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmTiposMaterialesComponent } from './abm-tipos-materiales.component';

describe('AbmTiposMaterialesComponent', () => {
  let component: AbmTiposMaterialesComponent;
  let fixture: ComponentFixture<AbmTiposMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmTiposMaterialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmTiposMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
