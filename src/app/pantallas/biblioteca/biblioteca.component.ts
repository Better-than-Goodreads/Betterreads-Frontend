import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Libro } from '../../entidades/Libro';
import { STATUS_BOOKSHELF, STATUS_BOOKSHELF_LABELS } from '../../entidades/StatusBiblioteca';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-biblioteca',
	templateUrl: './biblioteca.component.html',
	styleUrl: './biblioteca.component.css'
})
export class BibliotecaComponent {
	books: Libro[] = [];
	states = [
		...STATUS_BOOKSHELF_LABELS,
		"All",
	]
	userId = '';
	loading = true;

	statusValues = [...STATUS_BOOKSHELF, "all"];

	selectedState: string = 'read';

	constructor(private route: ActivatedRoute, private bibliotecaService: BibliotecaService, private _snackBar: MatSnackBar) { }

	selectState(state: string) {
		this.selectedState = state;
		this.bibliotecaService.getBookshelf(this.userId, this.selectedState).subscribe({
			next: (books) => {
				console.log('Books:', books);
				this.loading = false
				this.books = books.map((book: any) => {
					book.id = book.book_id;
					return book
				})
				console.log('Books:', this.books);
			},
			error: (error: any) => {
				this.loading = false
			}
		});
	}

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id') ?? '';
		this.userId = id;

		this.selectState(this.selectedState);

		console.log('ID:', id);
	}

	deleteFromShelf(bookId: string) {
		this.bibliotecaService.removeFromBookshelf(bookId).subscribe({
			next: () => {
				this.books = this.books.filter((book) => book.id != bookId);
				this._snackBar.open('Book deleted', 'X', { horizontalPosition: 'center', verticalPosition: 'top', duration: 5000 });
			},
			error: () => {
				this._snackBar.open('Error deleting book from bookshelf', 'X', { horizontalPosition: 'center', verticalPosition: 'top', duration: 5000 });
			}
		})
	}
}
