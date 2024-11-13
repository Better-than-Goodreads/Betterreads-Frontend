import { Component, OnInit } from '@angular/core';
import { Recomendacion } from '../../entidades/Recomendacion';
import { RecomendacionService } from '../../services/recomendacion.service';
import { catchError } from 'rxjs/operators';
import { of } from "rxjs";

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrl: './recomendaciones.component.css'
})
export class RecomendacionesComponent implements OnInit  {

  constructor(private recomendacionService: RecomendacionService) {}

  loading = true;
  error: any = null;
  recomendaciones: Recomendacion[] = [];

  ngOnInit() {
    this.recomendacionService.getRecomendaciones().pipe(catchError(error => {
      this.error = error.error;
      this.loading = false;
      return of([]);
    })).subscribe(recomendaciones => {this.recomendaciones = recomendaciones;
      this.loading = false;});
  }

  addRecommendation(genre: string) {
    this.recomendacionService.getMore(genre).subscribe(moreBooks => {
      let recomendacion = this.recomendaciones.find(recomendacion => recomendacion.genre === genre);
      if (recomendacion)
        recomendacion.books = moreBooks;
    })
  }
}
