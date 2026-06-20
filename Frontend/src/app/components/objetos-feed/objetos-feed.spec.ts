import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetosFeed } from './objetos-feed';

describe('ObjetosFeed', () => {
  let component: ObjetosFeed;
  let fixture: ComponentFixture<ObjetosFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjetosFeed],
    }).compileComponents();

    fixture = TestBed.createComponent(ObjetosFeed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
