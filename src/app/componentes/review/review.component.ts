import { Component, Input } from '@angular/core';
import { Review } from '../../entidades/Review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
	@Input() review: Review = new Review();
}
