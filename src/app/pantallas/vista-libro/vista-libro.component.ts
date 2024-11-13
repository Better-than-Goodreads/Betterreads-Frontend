import { Component } from '@angular/core';
import { Libro } from '../../entidades/Libro';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/servicio-libros.service';
import { Review } from '../../entidades/Review';
import { BibliotecaService } from '../../services/biblioteca.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { STATUS_BOOKSHELF, STATUS_BOOKSHELF_LABELS } from '../../entidades/StatusBiblioteca';
import { UsuarioActualService } from '../../services/usuario-actual.service';

@Component({
	selector: 'app-vista-libro',
	templateUrl: './vista-libro.component.html',
	styleUrl: './vista-libro.component.css'
})
export class VistaLibroComponent {
	reviews: Review[] = [];
	previewsReview: Review | null = null;
	publishReview = new Review();
	rating = 0;
	urlFoto = '';
	book = new Libro();
	puntuarReview = 0;
	statusBookshelf = STATUS_BOOKSHELF;
	statusLabels = STATUS_BOOKSHELF_LABELS;
	selectedStatus = STATUS_BOOKSHELF[2];

	currentStatus: string = '';

	isOwner = false;


	hoverEstrellas = 0;
	estrellas(cantidad: number) {
		this.hoverEstrellas = cantidad;
	}

	constructor(private route: ActivatedRoute, private bookService: BookService, private bibliotecaService: BibliotecaService, private _snackBar: MatSnackBar, private usuarioActualService: UsuarioActualService) { }

	ngOnInit() {
		this.setUpPantalla();
	}

	setUpPantalla() {
		this.currentStatus = STATUS_BOOKSHELF[2];
		const id = this.route.snapshot.paramMap.get('id') ?? '';
		this.bookService.getBook(id).subscribe(book => {
			this.book = book.book;
			this.publishReview = book.review?? new Review();
			this.hoverEstrellas = this.publishReview.rating;
			this.rating = this.publishReview.rating;
			console.log(this.publishReview);
			this.previewsReview = (book.book as any).review || null
			this.urlFoto = `http://localhost:8080/books/${this.book.id}/picture`;
			this.currentStatus = book.status;
			this.selectedStatus = this.currentStatus ?? STATUS_BOOKSHELF[2];

			console.log('STATUS:', this.currentStatus);

			this.isOwner = this.usuarioActualService.getId() == this.book.author_id;
		});

		this.bookService.getReviews(id).subscribe(reviews => {
			this.reviews = (reviews.reviews as any) as Review[];
			console.log('Reviews:', this.reviews);
		})
	}

	puntuar(i: number) {
		this.rating = i;
	}

	publicarReview() {
		this.publishReview.rating = this.rating;
		this.bookService.postReview(this.book.id, this.publishReview).subscribe({
			next: () => {
				this._snackBar.open('Review published correctly', 'X', {
			        horizontalPosition: 'center',
			        verticalPosition: 'top'
			      });
				this.setUpPantalla();
			},
			error: (error: any) => {
				console.log(error);
				this._snackBar.open('Error publishing review: ' + error.error.detail, 'X', {
			        horizontalPosition: 'center',
			        verticalPosition: 'top'
			      });
				this.setUpPantalla();
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

	borrarLibro() {
		this.bookService.deleteBook(this.book.id).subscribe({
			next: () => {
				this._snackBar.open('Book deleted', 'X', { horizontalPosition: 'center', verticalPosition: 'top', duration: 5000 });
				window.location.href = '/books';
			},
			error: (error: any) => {
				this._snackBar.open('Error deleting book', 'X', { horizontalPosition: 'center', verticalPosition: 'top', duration: 5000 });
			}
		});
	}
}
