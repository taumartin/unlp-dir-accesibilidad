import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmTiposEventosComponent } from './abm-tipos-eventos.component';

describe('AbmTiposEventosComponent', () => {
  let component: AbmTiposEventosComponent;
  let fixture: ComponentFixture<AbmTiposEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmTiposEventosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmTiposEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
