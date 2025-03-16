import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmApoyosComponent } from './abm-apoyos.component';

describe('AbmApoyosComponent', () => {
  let component: AbmApoyosComponent;
  let fixture: ComponentFixture<AbmApoyosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmApoyosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmApoyosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
