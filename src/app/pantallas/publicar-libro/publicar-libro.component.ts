import { Component } from '@angular/core';

export type Libro = {
  Title: string;
  Author: string;
  Description: string;
  AmountOfPages: number;
  PublicationDate: string;
  Language: string;
  Genres: string[];
  PhotoId: number;
};


@Component({
  selector: 'app-publicacion-libro',
  templateUrl: './publicar-libro.component.html',
  styleUrls: ['./publicar-libro.component.css'],
})
export class PublicarLibroComponent {
  libro: Libro = {
    Title: '',
    Author: '',
    Description: '',
    AmountOfPages: 0,
    PublicationDate: '',
    Language: '',
    Genres: [],
    PhotoId: 0,
  };

  genres: string = ""

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('File selected:', file);
    }
  }

  publicarLibro() {
	this.libro.Genres = this.genres.split(',').map((genre) => genre.trim());
	console.log('Libro a publicar:', this.libro);

    fetch('http://localhost:8080/api/books', {
      method: 'POST',
	  headers: {
		  contentType: 'application/json',
	  },
      body: JSON.stringify(this.libro),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Libro publicado exitosamente:', data);
		window.location.href = '/home';
      })
      .catch((error) => {
        console.error('Error al publicar el libro:', error);
      });
  }
}
