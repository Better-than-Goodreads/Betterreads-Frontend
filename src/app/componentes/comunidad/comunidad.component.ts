import { Component } from '@angular/core';
import { ComunidadService } from '../../services/comunidad.service';

@Component({
	selector: 'app-comunidad',
	templateUrl: './comunidad.component.html',
	styleUrl: './comunidad.component.css'
})
export class ComunidadComponent {
	comunidades: any[] = [];
	constructor(
		public comunidadService: ComunidadService) { }

	ngOnInit() {
		this.comunidadService.getCommunities().subscribe(
			(data) => {
				this.comunidades = data;
			}
		);
	}
}
