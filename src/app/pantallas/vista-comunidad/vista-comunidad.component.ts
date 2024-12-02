import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComunidadService } from '../../services/comunidad.service';
import { Comunidad } from '../../entidades/Comunidad';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../../componentes/post-dialog/post-dialog.component';
import { PostComunidad } from '../../entidades/Post';
import { UsuarioActualService } from '../../services/usuario-actual.service';
 
@Component({
	selector: 'app-vista-comunidad',
	templateUrl: './vista-comunidad.component.html',
	styleUrl: './vista-comunidad.component.css'
})
export class VistaComunidadComponent {

	constructor(private route: ActivatedRoute, private comunidadService: ComunidadService, private _snackBar: MatSnackBar, private dialog: MatDialog, private _usuarioActualService: UsuarioActualService) { }

	comunidad: Comunidad = new Comunidad();
	postsComunidad: PostComunidad[] = []
	isOwner = false;

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id') ?? '';

		this.comunidadService.getCommunityById(id).subscribe(
			(data) => {
				console.log('Community:', data);
				this.isOwner = data.owner_id === this._usuarioActualService.getId();
				this.comunidad = data;
				this.comunidad.image = "http://localhost:8080/communities/" + this.comunidad.id + "/picture";
			},
			(error) => {
				console.error('Error getting community:', error);
			}
		);

		this.comunidadService.getPosts(id).subscribe(
			(data) => {
				console.log('Posts:', data);
				this.postsComunidad = data.map((post) => {
					let date = new Date(post.date);
					post.date = date.toLocaleDateString() + " " + date.toLocaleTimeString();

					return post;
				})
			},
			(error) => {
				console.error('Error getting posts:', error);
			}
		);
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(PostDialogComponent, {
			data: { comunidad: this.comunidad },
			width: '400px',
			disableClose: false
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				console.log('Post publicado:', result);
			}
		});
	}

	joinCommunity(id: string) {
		this.comunidadService.joinCommunity(id).subscribe({
			next: () => {
				this.comunidad.joined = true;
			},
			error: (e) => {
				this._snackBar.open(e.error.error.d || "Error joining community", 'X', {});
			}
		});
	}

	leaveCommunity(id: string) {
		this.comunidadService.leaveCommunity(id).subscribe({
			next: () => {
				this.comunidad.joined = false;
			},
			error: (e) => {
				this._snackBar.open(e.error.error.d || "Error joining community", 'X', {});
			}
		});
	}


	deleteCommunity() {
		this.comunidadService.deleteCommunity(this.comunidad.id).subscribe({
			next: () => {
				this.comunidad.joined = false;
				window.location.href = '/';
			},
			error: (e) => {
				this._snackBar.open(e.error.error.d || "Error deleting community", 'X', {});
			}
		});
	}

}
