import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca.service';
import { UsuarioActualService } from '../../services/usuario-actual.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Observable, of } from "rxjs";
import { Libro } from '../../entidades/Libro';
import { STATUS_BOOKSHELF, STATUS_BOOKSHELF_LABELS } from '../../entidades/StatusBiblioteca';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { GENRES } from '../../entidades/Genres';
import { SORT_PROPERTIES } from '../../entidades/SortProperties';

@Component({
	selector: 'app-biblioteca',
	templateUrl: './biblioteca.component.html',
	styleUrl: './biblioteca.component.css'
})
export class BibliotecaComponent {
	books: Libro[] = [];
	states = [
		...STATUS_BOOKSHELF_LABELS.slice(1),
		"All",
	]
	userId = '';
	loading = true;

	statusValues = [...STATUS_BOOKSHELF.slice(1), "all"];

	selectedState: string = 'read';

	constructor(private route: ActivatedRoute, private bibliotecaService: BibliotecaService, private _snackBar: MatSnackBar, public usuarioActualService: UsuarioActualService, private usuarioService: UsuariosService) { }

	selectState(state: string) {
		this.selectedState = state;
		this.onSearch();
	}

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id') ?? '';
		this.userId = id;

		this.username$ = this.usuarioService.getUsuario(id).pipe(map(usuario => usuario.username));

		this.selectState(this.selectedState);

		console.log('ID:', id);
	}

	username$: Observable<string> = of(''); 

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

	genres = ['',...GENRES];
	selectedGenre = '';
	selectedOrderProp = '';
	sortProperties = ['',...SORT_PROPERTIES];
	onSearch() {
		this.loading = true;
		this.bibliotecaService.search(this.userId, this.selectedState, this.selectedGenre, this.selectedOrderProp, this.order).subscribe({
		next: (data: any) => {
		  this.loading = false;
		  this.books = data.map((book: any) => {
				book.id = book.book_id;
				book.avg_rating = book.avg_ratings;
				return book
			})
		},
		error: (error: any) => {
		  console.error('Error getting books from bookshelf', error);
		  this.loading = false;
		  this._snackBar.open(`Error getting books from bookshelf`, 'X');
		}

		});
	}

	order = 'desc';
	toggleSort() {
		this.order = this.order === 'desc' ? 'asc' : 'desc';
		this.onSearch();
	}
}
