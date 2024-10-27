import { Component, Input } from '@angular/core';
import { Libro } from '../../entidades/Libro';
import { BookService } from '../../services/servicio-libros.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
	@Input() book: Libro = new Libro();

	constructor(private bookService: BookService) { }
	
	ngOnInit() {
		this.bookService.getRating(this.book.id).subscribe((data: any) => {
			this.book.stars = data.rating;
		});
	}

	puntuar(i: number) {
		this.bookService.rateBook(this.book.id, i).subscribe();
		this.book.stars = i;
	}
}