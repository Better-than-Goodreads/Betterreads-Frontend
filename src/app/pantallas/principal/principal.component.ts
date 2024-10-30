import { Component, OnInit } from '@angular/core';
import { Libro } from '../../entidades/Libro';
import { BookService } from '../../services/servicio-libros.service';
import { GENRES } from '../../entidades/Genres';

@Component({
	selector: 'app-principal',
	templateUrl: './principal.component.html',
	styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
	books: Libro[] = [];
	loading = true;
	searchText = '';
	filteredBooks: Libro[] = [];
	selectedGenres: string[] = [];
	genres = GENRES

	constructor(private bookService: BookService) { }

	ngOnInit(): void {
		this.fetchBooks();
	}

	filterBooks() {
		console.log('Filtering books');
		if (this.selectedGenres.length === 0) {
		  this.filteredBooks = [...this.books];
		} else {
		  this.filteredBooks = this.books.filter(book =>
			this.selectedGenres.every(genre => book.genres.includes(genre))
		  );
		}
	}

	onSearch() {
		this.loading = true;
		this.bookService.searchBooks(this.searchText).subscribe({
			next: (data: any) => {
				console.log('Books fetched', data);
				this.loading = false;
				this.books = data.books.map((book: any) => { 
					return book.book 
				}) as Libro[];
				this.filteredBooks = this.books;
				this.filterBooks();
			},
			error: (error: any) => {
				console.error('Error fetching books', error);
			}

		})
	}

	fetchBooks(): void {
		this.bookService.getBooks().subscribe({
			next: (data: any) => {
				console.log('Books fetched', data);
				this.books = data?.map((book: any) => { 
					return book.book 
				}) as Libro[];
				console.log(data.books);
				this.filteredBooks = this.books as Libro[];
				this.loading = false;
			},
			error: (error) => {
				console.error('Error fetching books', error);
				this.loading = false;
			}
		});
	}
}
