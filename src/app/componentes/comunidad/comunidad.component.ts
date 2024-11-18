import { Component } from '@angular/core';
import { ComunidadService } from '../../services/comunidad.service';
import { Comunidad } from '../../entidades/Comunidad';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioActualService } from '../../services/usuario-actual.service';

@Component({
	selector: 'app-comunidad',
	templateUrl: './comunidad.component.html',
	styleUrl: './comunidad.component.css'
})
export class ComunidadComponent {
	comunidades: Comunidad[] = [];

	comunidadAPublicar: Comunidad = new Comunidad();
	error: string = '';

	constructor(
		private comunidadService: ComunidadService,
		private _snackBar: MatSnackBar,
		private usuarioActualService: UsuarioActualService,
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

	createCommunity() {
		if (!this.comunidadAPublicar.name || !this.comunidadAPublicar.description) {
			this._snackBar.open('Complete all required fields.', 'X', {});
			return
		}

		this.comunidadAPublicar.owner_id = this.usuarioActualService.getId()

		this.comunidadService.createCommunity(this.comunidadAPublicar).subscribe({
			next: (data) => {
				this.comunidades = [data, ...this.comunidades];
				this.comunidadAPublicar = new Comunidad();
				this._snackBar.open("Community created successfully", 'X', {});
			},
			error: (e) => {
				this.error = e.error.error.d;
				this._snackBar.open(e.error.error.d || "Error creating community", 'X', {});
			}
		});
	}
}
