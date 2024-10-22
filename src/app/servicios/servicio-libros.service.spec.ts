import { TestBed } from '@angular/core/testing';

import { ServicioLibrosService } from './servicio-libros.service';

describe('ServicioLibrosService', () => {
  let service: ServicioLibrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioLibrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
