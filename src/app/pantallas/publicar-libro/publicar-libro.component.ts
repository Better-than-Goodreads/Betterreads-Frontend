import { Component } from '@angular/core';
import { Libro } from '../../entidades/Libro';



@Component({
  selector: 'app-publicacion-libro',
  templateUrl: './publicar-libro.component.html',
  styleUrls: ['./publicar-libro.component.css'],
})
export class PublicarLibroComponent {
  libro: Libro = new Libro();
  genresString: string = ""

  selectedFile: File | null = null;

  error: string = '';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('File selected:', file);
    }
  }

  publicarLibro() {
	if (this.genresString) {
		this.libro.genres = this.genresString.split(',').map((genre) => genre.trim());
	}

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
		"amount_of_pages": this.libro.amount_of_pages.toString(),
		"author": this.libro.author,
		"description": this.libro.description,
		"genres": this.libro.genres,
		"language": this.libro.language,
		"publication_date": this.libro.publication_date,
		"photo_id": "?"
	};

    fetch('http://localhost:8080/books', {
      method: 'POST',
	  headers: {
		  contentType: 'application/json',
	  },
      body: JSON.stringify(bookToPublish),
	  "mode": "no-cors",
    })
      .then((res) => { 
		  if (res.ok) {
			  return res.json()
		  }
		  throw new Error(`Status code not OK ${res.status}`);
	  })
      .then((data) => {
        console.log('Libro publicado exitosamente:', data);
		window.location.href = '/home';
      })
      .catch((error) => {
		  console.error('Error al publicar el libro:', error);
		  this.error = 'Hubo un error al publicar el libro. Intentelo nuevamente.';
      });
  }
}
