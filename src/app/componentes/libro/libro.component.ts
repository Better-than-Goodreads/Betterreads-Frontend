import { Component, Input } from '@angular/core';
import { Libro } from '../../types/libro';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
	@Input() book: Libro = {
		id: 1,
		title: "",
		content: "",
		image: "",
		author: "",
		stars: 0
	};

	puntuar(i: number) {
		this.book.stars = i;
	}
}
