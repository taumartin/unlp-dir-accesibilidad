import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudLayoutComponent } from './crud-layout.component';

describe('CrudLayoutComponent', () => {
  let component: CrudLayoutComponent;
  let fixture: ComponentFixture<CrudLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
