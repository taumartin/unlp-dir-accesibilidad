import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmTutoresComponent } from './abm-tutores.component';

describe('AbmTutoresComponent', () => {
  let component: AbmTutoresComponent;
  let fixture: ComponentFixture<AbmTutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmTutoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmTutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
