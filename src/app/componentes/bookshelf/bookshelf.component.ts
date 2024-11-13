import { Component, Input } from '@angular/core';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Usuario } from '../../entidades/usuario';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrl: './bookshelf.component.css'
})
export class BookshelfComponent {

    _usuario: Usuario = new Usuario({});

    @Input() set usuario(usuario: Usuario) {
      this._usuario = usuario;
      if (!usuario.id) return;
      
      forkJoin([
        this.bibliotecaService.getBookshelf(usuario.id, 'read'),
        this.bibliotecaService.getBookshelf(usuario.id, 'reading'),
        this.bibliotecaService.getBookshelf(usuario.id, 'plan-to-read')
      ]).subscribe(([read, reading, planToRead])=> {
        this.states.set('Read', read.length);
        this.states.set('Reading', reading.length);
        this.states.set('Plan to read', planToRead.length);
        console.log("estados");
        console.log(this.states);
      })
    }

    constructor(private bibliotecaService: BibliotecaService, private router: Router) {}

    goToBookshelf() {
    this.router.navigate(['bookshelf', this._usuario.id]);
  }

    states = new Map<string, number>();
}
