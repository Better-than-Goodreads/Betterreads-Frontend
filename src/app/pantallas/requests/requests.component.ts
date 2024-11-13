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

	acceptFriendRequest(id: string) { }
	rejectFriendRequest(id: string) { }

	requests: Usuario[] = [];
	sentRequests: Usuario[] = [];
}
