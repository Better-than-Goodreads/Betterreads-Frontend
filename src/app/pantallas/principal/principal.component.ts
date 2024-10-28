import { Component, OnInit } from '@angular/core';
import { Libro } from '../../entidades/Libro';
import { BookService } from '../../services/servicio-libros.service';

@Component({
	selector: 'app-principal',
	templateUrl: './principal.component.html',
	styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
	books: Libro[] = [];
	loading = true;

	searchText = '';
	constructor(private bookService: BookService) { }

	ngOnInit(): void {
		this.fetchBooks();
	}

	onSearch() {
		this.loading = true;
		this.bookService.searchBooks(this.searchText).subscribe({
			next: (data: any) => {
				console.log('Books fetched', data);
				this.loading = false;
				this.books = data.books as Libro[];
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
				this.books = data.books as Libro[];
				this.loading = false;
			},
			error: (error) => {
				console.error('Error fetching books', error);
				this.loading = false;
			}
		});
	}
}
