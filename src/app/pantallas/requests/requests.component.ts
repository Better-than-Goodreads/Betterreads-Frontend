import { Component } from '@angular/core';
import { AmigosService } from '../../amigos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../entidades/usuario';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {

	constructor(private amigosService: AmigosService, private _snackBar: MatSnackBar) {}

	ngOnInit() {
		this.amigosService.getFriendRequestsReceived().subscribe(
			{
				next: (data) => {
					console.log('Requests:', data);
					this.requests = data;
				},
				error: (error) => {
					this._snackBar.open('Error al obtener las solicitudes de amistad', 'Cerrar', {})
				}
			}
		);
	}

	acceptFriendRequest(id: string) { 
		this.amigosService.acceptFriendRequest(id).subscribe({
			next: () => {
				this._snackBar.open('Solicitud de amistad aceptada', 'Cerrar', {});
				this.requests = this.requests.filter(request => request.id != id);
			},
			error: () => {
				this._snackBar.open('Error al aceptar la solicitud de amistad', 'Cerrar', {});
			}
		});
	}

	rejectFriendRequest(id: string) { 
		this.amigosService.rejectFriendRequest(id).subscribe({
			next: () => {
				this._snackBar.open('Solicitud de amistad aceptada', 'Cerrar', {});
				this.requests = this.requests.filter(request => request.id != id);
			},
			error: () => {
				this._snackBar.open('Error al aceptar la solicitud de amistad', 'Cerrar', {});
			}
		});
	}

	requests: Usuario[] = [];
	sentRequests: Usuario[] = [];
}
