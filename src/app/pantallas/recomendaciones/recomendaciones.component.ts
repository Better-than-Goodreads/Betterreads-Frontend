import { Component, OnInit } from '@angular/core';
import { Recomendacion } from '../../entidades/Recomendacion';
import { RecomendacionService } from '../../services/recomendacion.service';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrl: './recomendaciones.component.css'
})
export class RecomendacionesComponent implements OnInit  {

  constructor(private recomendacionService: RecomendacionService) {}

  loading = true;
  recomendaciones: Recomendacion[] = [];

  ngOnInit() {
    this.recomendacionService.getRecomendaciones().subscribe(recomendaciones => {this.recomendaciones = recomendaciones;
      this.loading = false;});
  }
}
