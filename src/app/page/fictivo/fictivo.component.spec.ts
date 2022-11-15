import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FictivoComponent } from './fictivo.component';

describe('FictivoComponent', () => {
  let component: FictivoComponent;
  let fixture: ComponentFixture<FictivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FictivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FictivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
