import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsPorUsuarioComponent } from './reviews-por-usuario.component';

describe('ReviewsPorUsuarioComponent', () => {
  let component: ReviewsPorUsuarioComponent;
  let fixture: ComponentFixture<ReviewsPorUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsPorUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsPorUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
