import { Component } from '@angular/core';
import { ComunidadService } from '../../services/comunidad.service';
import { Comunidad } from '../../entidades/Comunidad';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-comunidad',
	templateUrl: './comunidad.component.html',
	styleUrl: './comunidad.component.css'
})
export class ComunidadComponent {
	comunidades: Comunidad[] = [];
	constructor(
		private comunidadService: ComunidadService,
		private _snackBar: MatSnackBar
	) { }

	ngOnInit() {
		this.comunidadService.getCommunities().subscribe(
			(data) => {
				console.log('Communities:', data);
				this.comunidades = data;
			},
			(error) => {
				console.error('Error getting communities:', error);
			}
		);
	}

	joinCommunity(id: string) {
		this.comunidadService.joinCommunity(id).subscribe({
			next: () => {
				this.comunidades = this.comunidades.map(comunidad => {
					if (comunidad.id == id) {
						comunidad.joined = true;
					}
					return comunidad;
				});
			},
			error: (e) => {
				this._snackBar.open(e.error.error.d || "Error joining community", 'X', {});
			}
		}
		);
	}
}
