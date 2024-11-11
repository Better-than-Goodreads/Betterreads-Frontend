import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Libro } from '../../entidades/Libro';
import { BookService } from '../../services/servicio-libros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
	@Input() book: Libro = new Libro();
	@Input() showDeleteButton: boolean = false;
	@Output() delete = new EventEmitter<string>();

	borrar() {
		this.delete.emit(this.book.id);
	}

	constructor(private bookService: BookService, private router: Router) { }

	ngOnInit() {
		// this.bookService.getRating(this.book.id).subscribe((data: any) => {
		// 	this.book.stars = data.rating;
		// });
	}

	puntuar(i: number) {
		this.bookService.rateBook(this.book.id, i).subscribe();
		this.book.stars = i;
	}

	verLibro() {
		this.router.navigate(['/book', this.book.id])
	}
}
