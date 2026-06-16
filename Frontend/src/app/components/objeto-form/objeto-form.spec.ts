import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetoForm } from './objeto-form';

describe('ObjetoForm', () => {
  let component: ObjetoForm;
  let fixture: ComponentFixture<ObjetoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjetoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ObjetoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
