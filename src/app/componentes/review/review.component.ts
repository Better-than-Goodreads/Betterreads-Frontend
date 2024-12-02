import { Component, Input, AfterViewInit } from '@angular/core';
import { Review } from '../../entidades/Review';
import { Router } from '@angular/router';
import { BookService } from '../../services/servicio-libros.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements AfterViewInit {
	@Input() review: Review = new Review();
	@Input() bookTitle = '';
	@Input() bookId = '';

	constructor(private router: Router, private boookService: BookService, private matSnackBar: MatSnackBar) {}

	ngAfterViewInit() {
		console.log("ID", this.bookId)	
		this.urlFotoPerfil = `http://localhost:8080/users/${this.review.user_id}/picture`;
		this.showDelete = this.review.user_id === sessionStorage.getItem('user_id')?? "";
	}

	urlFotoPerfil = '';
	defaultImage = './default-profile.png';
	showDelete = false;

	borrar() {
		this.boookService.deleteReview(this.bookId).subscribe({
			next: () => {
				this.matSnackBar.open('Review deleted succesfuly', 'Cerrar', { duration: 2000 });
				location.reload();
			},
			error: () => {
				this.matSnackBar.open('Error deleting review', 'Cerrar', { duration: 2000 });
			}
		})
	}

	goToBook() {
		this.router.navigate(['book', this.bookId]);
	}

	goToUser() {
		this.router.navigate(['user', this.review.user_id]);
	}
}
