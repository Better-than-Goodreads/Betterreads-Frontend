import { Component } from '@angular/core';
import { Libro } from '../../entidades/Libro';
import { BookService } from '../../services/servicio-libros.service';
import { GENRES } from '../../entidades/Genres';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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
  maxDate = new Date();

  constructor(private bookService: BookService, private _snackBar: MatSnackBar) {
  	this.libro.amount_of_pages = 1;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('File selected:', file);
    }
  }

  publicarLibro() {
	if (!this.libro.title || !this.libro.publication_date || !this.libro.publication_date) {
		this.error = 'Complete all required fields.';
		return
	}

	if (this.libro.genres.length === 0) {
		this.error = 'You must enter at least one genre.';
		return
	}

	if (!this.selectedFile) {
		this.error = 'You must select an image for the book.';
		return
	}

	if (this.selectedFile.type !== 'image/jpeg' && this.selectedFile.type !== 'image/png') {
		this.error = 'The image must be of type .jpg or .png.';
		return
	}

	let bookToPublish = {
		"title": this.libro.title,
		"amount_of_pages": this.libro.amount_of_pages,
		"description": this.libro.description,
		"genres": this.libro.genres,
		"language": this.libro.language,
		"publication_date": this.libro.publication_date,
	};

    this.bookService.postBook(bookToPublish, this.selectedFile).subscribe({
      next: () => {
        window.location.href = '/home/'; // tambn podria ir a /libros/{nombre libro}
				this._snackBar.open('Book published correctly');
      },
      error: (error) => {
        this.error = 'There was an error publishing the book.' + error.detail;
      }
    });
  }
}
