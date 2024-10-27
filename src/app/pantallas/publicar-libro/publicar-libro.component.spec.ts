import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarLibroComponent } from './publicar-libro.component';

describe('PublicarLibroComponent', () => {
  let component: PublicarLibroComponent;
  let fixture: ComponentFixture<PublicarLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicarLibroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
