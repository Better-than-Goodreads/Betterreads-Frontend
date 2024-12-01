import { Component, Input, AfterViewInit } from '@angular/core';
import { Review } from '../../entidades/Review';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements AfterViewInit {
	@Input() review: Review = new Review();
	@Input() bookTitle = '';
	@Input() bookId = '';

	constructor(private router: Router) {}

	ngAfterViewInit() {
		this.urlFotoPerfil = `http://localhost:8080/users/${this.review.user_id}/picture`;
		this.showDelete = this.review.user_id === sessionStorage.getItem('user_id')?? "";
	}

	urlFotoPerfil = '';
	defaultImage = './default-profile.png';
	showDelete = false;
	borrar() {

	}

	goToBook() {
		this.router.navigate(['book', this.bookId]);
	}
	goToUser() {
		this.router.navigate(['user', this.review.user_id]);
	}
}
