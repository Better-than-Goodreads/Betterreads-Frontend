import { Component } from '@angular/core';
import { Libro } from '../../entidades/Libro';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/servicio-libros.service';
import { Review } from '../../entidades/Review';
import { BibliotecaService } from '../../services/biblioteca.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

	constructor(private route: ActivatedRoute, private bookService: BookService, private bibliotecaService: BibliotecaService, private _snackBar: MatSnackBar) { }

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id') ?? '';
		this.bookService.getBook(id).subscribe(book => {
			this.book = book.book;
			this.previewsReview = (book.book as any).review || null
			this.urlFoto = `http://localhost:8080/books/${this.book.id}/picture`;
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
				window.location.reload();
			},
			error: (error: any) => {
				console.error('Error publishing review', error); // Cuando este el edit esto no pasa
			}
		});
	}

	agregarBiblioteca() {
		this.bibliotecaService.addToBookshelf(this.book.id, 'Read').subscribe({
			next: () => {
				this._snackBar.open('Libro agregado a la biblioteca', 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 5000 });
			},
			error: (error: any) => {
				this._snackBar.open('Error al agregar libro a la biblioteca', 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 5000 });
			}
		});
	}
}
