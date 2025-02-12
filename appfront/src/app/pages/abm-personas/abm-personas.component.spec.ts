import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmPersonasComponent } from './abm-personas.component';

describe('AbmPersonasComponent', () => {
  let component: AbmPersonasComponent;
  let fixture: ComponentFixture<AbmPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmPersonasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
