import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisObjetos } from './mis-objetos';

describe('MisObjetos', () => {
  let component: MisObjetos;
  let fixture: ComponentFixture<MisObjetos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisObjetos],
    }).compileComponents();

    fixture = TestBed.createComponent(MisObjetos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
