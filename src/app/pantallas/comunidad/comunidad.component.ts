import { Component } from '@angular/core';
import { ComunidadService } from '../../services/comunidad.service';
import { Comunidad } from '../../entidades/Comunidad';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioActualService } from '../../services/usuario-actual.service';

@Component({
	selector: 'app-comunidad',
	templateUrl: './comunidad.component.html',
	styleUrl: './comunidad.component.css'
})
export class ComunidadComponent {
	comunidades: Comunidad[] = [];

	comunidadAPublicar: Comunidad = new Comunidad();
	selectedFile: File | null = null;
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

	onFileSelected(event: any) {
		const file: File = event.target.files[0];
		if (file) {
			this.selectedFile = file;
			console.log('File selected:', file);
		}
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
		if (!this.comunidadAPublicar.name || !this.comunidadAPublicar.description || !this.selectedFile) {
			this._snackBar.open('Complete all required fields.', 'X', {});
			this.error = 'Complete all fields.';
			return
		}

		const form = new FormData()
		form.append('data', JSON.stringify(this.comunidadAPublicar))
		form.append('file', this.selectedFile)

		this.comunidadService.createCommunity(form).subscribe({
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
