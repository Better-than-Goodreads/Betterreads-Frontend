import { Component } from '@angular/core';
import { Libro } from '../../entidades/Libro';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/servicio-libros.service';
import { Review } from '../../entidades/Review';
import { BibliotecaService } from '../../services/biblioteca.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { STATUS_BOOKSHELF, STATUS_BOOKSHELF_LABELS } from '../../entidades/StatusBiblioteca';

@Component({
	selector: 'app-vista-libro',
	templateUrl: './vista-libro.component.html',
	styleUrl: './vista-libro.component.css'
})
export class VistaLibroComponent {
	reviews: Review[] = [];
	previewsReview: Review | null = null;
	publishReview = new Review();
	urlFoto = '';
	book = new Libro();
	puntuarReview = 0;
	statusBookshelf = STATUS_BOOKSHELF;
	statusLabels = STATUS_BOOKSHELF_LABELS;
	selectedStatus = STATUS_BOOKSHELF[2];

	currentStatus: string = '';

	constructor(private route: ActivatedRoute, private bookService: BookService, private bibliotecaService: BibliotecaService, private _snackBar: MatSnackBar) { }

	ngOnInit() {
		this.currentStatus = STATUS_BOOKSHELF[2];
		const id = this.route.snapshot.paramMap.get('id') ?? '';
		this.bookService.getBook(id).subscribe(book => {
			this.book = book.book;
			this.publishReview = book.review;
			console.log(this.publishReview);
			this.previewsReview = (book.book as any).review || null
			this.urlFoto = `http://localhost:8080/books/${this.book.id}/picture`;
			this.currentStatus = book.status;
			this.selectedStatus = this.currentStatus ?? STATUS_BOOKSHELF[2];
			console.log('STATUS:', this.currentStatus);
		});

		this.bookService.getReviews(id).subscribe(reviews => {
			this.reviews = (reviews.reviews as any) as Review[];
			console.log('Reviews:', this.reviews);
		})
	}

	puntuar(i: number) {
		this.publishReview.rating = i;
	}

	publicarReview() {
		this.bookService.postReview(this.book.id, this.publishReview).subscribe({
			next: () => {
				this._snackBar.open('Review published', 'X', {
			        horizontalPosition: 'center',
			        verticalPosition: 'top',
			      });
				window.location.reload();
			},
			error: (error: any) => {
				this._snackBar.open('Error publishing review', 'X', {
			        horizontalPosition: 'center',
			        verticalPosition: 'top',
			      });
				console.error('Error publishing review', error); // Cuando este el edit esto no pasa
			}
		});
	}

	agregarBiblioteca(event: any) {
		let status = event.value;
		console.log(this.currentStatus);
		console.log(status);
		if (this.currentStatus == status) {
			this._snackBar.open('This book is already in that state', 'X', { horizontalPosition: 'center', verticalPosition: 'top', duration: 5000 });
			return
		}

		if (this.currentStatus == null) {
			this.bibliotecaService.addToBookshelf(this.book.id, status).subscribe({
				next: () => {
					this._snackBar.open(`Book added to ${status}`, 'X', { horizontalPosition: 'center', verticalPosition: 'top', duration: 5000 });
				},
				error: (error: any) => {
					this._snackBar.open(`Error adding the book to ${status}`, 'X', { horizontalPosition: 'center', verticalPosition: 'top', duration: 5000 });
				}
			});
		} else {
			this.bibliotecaService.editToBookshelf(this.book.id, status).subscribe({
				next: () => {
					this._snackBar.open(`Book added to ${status}`, 'X', { horizontalPosition: 'center', verticalPosition: 'top', duration: 5000 });
				},
				error: (error: any) => {
					this._snackBar.open(`Error adding the book to ${status}`, 'X', { horizontalPosition: 'center', verticalPosition: 'top', duration: 5000 });
				}
			});
		}
		this.currentStatus = status;
	}
}
