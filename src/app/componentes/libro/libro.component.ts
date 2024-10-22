import { Component, Input } from '@angular/core';
import { Libro } from '../../entidades/Libro';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
	@Input() book: Libro = new Libro();

	puntuar(i: number) {
		this.book.stars = i;
	}
}
