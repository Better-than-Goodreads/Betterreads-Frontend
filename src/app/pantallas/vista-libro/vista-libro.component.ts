import { Component } from '@angular/core';
import { Libro } from '../../entidades/Libro';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/servicio-libros.service';


@Component({
  selector: 'app-vista-libro',
  templateUrl: './vista-libro.component.html',
  styleUrl: './vista-libro.component.css'
})
export class VistaLibroComponent {

  constructor(private route: ActivatedRoute, private bookService: BookService){}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')?? '';
    this.bookService.getBook(id).subscribe(book => {
      this.book = book;
      this.urlFoto = `http://localhost:8080/books/${book.id}/picture`;
    });
  }

    puntuar(i: number) {
    this.bookService.rateBook(this.book.id, i).subscribe();
  }

  urlFoto = '';
  book = new Libro();
}
