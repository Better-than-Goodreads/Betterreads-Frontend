import { Component, OnInit } from '@angular/core';
import { Libro } from '../../entidades/Libro';
import { BookService } from '../../services/servicio-libros.service';

@Component({
	selector: 'app-principal',
	templateUrl: './principal.component.html',
	styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
	books: Libro[] = [
		{
			id: "aa",
			title: "Unruly: The Ridiculous History of England's Kings and Queens",
			author: "David Mitchell",
			description: "A rollicking history of England's earliest kings and queens, a story of narcissists",
			amount_of_pages: 0,
			publication_date: "",
			language: "",
			genres: [],
			photo_id: 0,
			stars: 4,
			image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1684764813i/152034931._SY180_.jpg"
		},
		{
			id: "dd",
			title: "Behind Every Good Man ",
			description: "A wronged wife goes toe to toe with her cheating husband at the polls in this hilarious and heart-lifting novel by the bestselling author of Don’t Forget to Write.",
			author: "Sara Goodman Confino",
			image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1708200930i/202260557._SX120_.jpg",
			amount_of_pages: 0,
			publication_date: "",
			language: "",
			genres: [],
			photo_id: 0,
			stars: 4
		}
	];
	loading = true;

	constructor(private bookService: BookService) { }

	ngOnInit(): void {
		this.fetchBooks();
	}

	fetchBooks(): void {
		this.bookService.getBooks().subscribe({
			next: (data) => {
				this.books = data;
				this.loading = false;
			},
			error: (error) => {
				console.error('Error fetching books', error);
				this.loading = false;
			}
		});
	}
}
