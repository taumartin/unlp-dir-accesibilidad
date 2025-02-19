import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmSemestresComponent } from './abm-semestres.component';

describe('AbmSemestresComponent', () => {
  let component: AbmSemestresComponent;
  let fixture: ComponentFixture<AbmSemestresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmSemestresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmSemestresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
