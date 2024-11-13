import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosPorAutorComponent } from './libros-por-autor.component';

describe('LibrosPorAutorComponent', () => {
  let component: LibrosPorAutorComponent;
  let fixture: ComponentFixture<LibrosPorAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibrosPorAutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrosPorAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
