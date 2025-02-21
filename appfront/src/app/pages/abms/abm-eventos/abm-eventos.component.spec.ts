import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmEventosComponent } from './abm-eventos.component';

describe('AbmEventosComponent', () => {
  let component: AbmEventosComponent;
  let fixture: ComponentFixture<AbmEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmEventosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
