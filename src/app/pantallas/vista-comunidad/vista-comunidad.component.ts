import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComunidadService } from '../../services/comunidad.service';
import { Comunidad } from '../../entidades/Comunidad';

@Component({
  selector: 'app-vista-comunidad',
  templateUrl: './vista-comunidad.component.html',
  styleUrl: './vista-comunidad.component.css'
})
export class VistaComunidadComponent {

    constructor(private route: ActivatedRoute, private comunidadService: ComunidadService) {}

	comunidad: Comunidad = new Comunidad();

    ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id')?? '';
		this.comunidadService.getCommunityById(id).subscribe(
			(data) => {
				console.log('Community:', data);
				this.comunidad = data;
				this.comunidad.image = "http://localhost:8080/communities/" + this.comunidad.id + "/picture";
			},
			(error) => {
				console.error('Error getting community:', error);
			}
		);
	}

	joinCommunity(id: string) {}
}
