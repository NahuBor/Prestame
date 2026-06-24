import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetoDetalle } from './objeto-detalle';

describe('ObjetoDetalle', () => {
  let component: ObjetoDetalle;
  let fixture: ComponentFixture<ObjetoDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjetoDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(ObjetoDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
