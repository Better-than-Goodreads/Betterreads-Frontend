import { Component } from '@angular/core';
import { Libro } from '../../entidades/Libro';
import { BookService } from '../../services/servicio-libros.service';

const GENRES = [
    "Fiction",
    "Non-fiction",
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Horror",
    "Romance",
    "Thriller",
    "Historical",
    "Biography",
    "Autobiography",
    "Self-help",
    "Travel",
    "Guide",
    "Poetry",
    "Drama",
    "Satire",
    "Anthology",
    "Encyclopedia",
    "Dictionary",
    "Comic",
    "Art",
    "Cookbook",
]

@Component({
  selector: 'app-publicacion-libro',
  templateUrl: './publicar-libro.component.html',
  styleUrls: ['./publicar-libro.component.css'],
})
export class PublicarLibroComponent {
  libro: Libro = new Libro();
  genresList = GENRES;
  selectedFile: File | null = null;
  error: string = '';

  constructor(private bookService: BookService) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('File selected:', file);
    }
  }

  publicarLibro() {
	if (!this.libro.title || !this.libro.author || !this.libro.publication_date || !this.libro.publication_date) {
		this.error = 'Complete todos los campos requeridos.';
		return
	}

	if (this.libro.genres.length === 0) {
		this.error = 'Debe ingresar al menos un género';
		return
	}

	let bookToPublish = {
		"title": this.libro.title,
		"amount_of_pages": this.libro.amount_of_pages,
		"description": this.libro.description,
		"genres": this.libro.genres,
		"language": this.libro.language,
		"publication_date": this.libro.publication_date,
		"author": this.libro.author,
	};

    this.bookService.postBook(bookToPublish).subscribe({
      next: () => {
        // window.location.href = '/home'; // tambn podria ir a /libros/{nombre libro}
		console.log('Libro publicado correctamente');
      },
      error: () => {
        this.error = 'Hubo un error al publicar el libro. Intentelo nuevamente.';
      }
    });
  }
}
