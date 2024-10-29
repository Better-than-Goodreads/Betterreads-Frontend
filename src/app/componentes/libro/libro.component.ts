import { Component, Input } from '@angular/core';
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

	constructor(private bookService: BookService, private router: Router) { }
	
	ngOnInit() {
		console.log('Book:', this.book.author);
		// this.bookService.getRating(this.book.id).subscribe((data: any) => {
		// 	this.book.stars = data.rating;
		// });
	}

	puntuar(i: number) {
		this.bookService.rateBook(this.book.id, i).subscribe();
		this.book.stars = i;
	}

	verLibro() {
		this.router.navigate(['/libro', this.book.id])
	} 
}
