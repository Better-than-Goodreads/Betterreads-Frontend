import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Libro } from '../../entidades/Libro';
import { STATUS_BOOKSHELF, STATUS_BOOKSHELF_LABELS } from '../../entidades/StatusBiblioteca';

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

	constructor(private route: ActivatedRoute, private bibliotecaService: BibliotecaService) { }

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

}
