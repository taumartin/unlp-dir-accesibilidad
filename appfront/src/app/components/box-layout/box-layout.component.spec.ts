import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxLayoutComponent } from './box-layout.component';

describe('BoxLayoutComponent', () => {
  let component: BoxLayoutComponent;
  let fixture: ComponentFixture<BoxLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
