import { Component } from '@angular/core';
import { Libro } from '../../entidades/Libro';

@Component({
  selector: 'app-vista-libro',
  templateUrl: './vista-libro.component.html',
  styleUrl: './vista-libro.component.css'
})
export class VistaLibroComponent {

  constructor(){}

  book = new Libro();
}
