import { Component } from '@angular/core';
import { AmigosService } from '../../services/amigos.service';
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
					this._snackBar.open('Error getting friend requests', 'X', {})
				}
			}
		);
	}

	acceptFriendRequest(id: string) { 
		this.amigosService.acceptFriendRequest(id).subscribe({
			next: () => {
				this._snackBar.open('Friend request accepted', 'X', {});
				this.requests = this.requests.filter(request => request.id != id);
			},
			error: () => {
				this._snackBar.open('Error accepting friend request', 'X', {});
			}
		});
	}

	rejectFriendRequest(id: string) { 
		this.amigosService.rejectFriendRequest(id).subscribe({
			next: () => {
				this._snackBar.open('Friend request rejected', 'X', {});
				this.requests = this.requests.filter(request => request.id != id);
			},
			error: () => {
				this._snackBar.open('Error rejecting friend request', 'X', {});
			}
		});
	}

	requests: Usuario[] = [];
	sentRequests: Usuario[] = [];
}
