import { Component } from '@angular/core';
import { Libro } from '../../entidades/Libro';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/servicio-libros.service';
import { Review } from '../../entidades/Review';


@Component({
	selector: 'app-vista-libro',
	templateUrl: './vista-libro.component.html',
	styleUrl: './vista-libro.component.css'
})
export class VistaLibroComponent {
	reviews: Review[] = [];
	publishReview = new Review();
	urlFoto = '';
	book = new Libro();
	puntuarReview = 0;

	constructor(private route: ActivatedRoute, private bookService: BookService) { }

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id') ?? '';
		this.bookService.getBook(id).subscribe(book => {
			this.book = book.book.book;
			this.urlFoto = `http://localhost:8080/books/${this.book.id}/picture`;
		});

		this.bookService.getReviews(id).subscribe(reviews => {
			this.reviews = (reviews.reviews as any) as Review[];
		})
	}

	puntuar(i: number) {
		this.publishReview.rating = i;
	}

	publicarReview() {
		this.bookService.postReview(this.book.id, this.publishReview).subscribe();
	}
}
