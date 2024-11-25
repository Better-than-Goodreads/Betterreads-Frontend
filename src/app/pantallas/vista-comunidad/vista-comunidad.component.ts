import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComunidadService } from '../../services/comunidad.service';
import { Comunidad } from '../../entidades/Comunidad';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../../componentes/post-dialog/post-dialog.component';

@Component({
	selector: 'app-vista-comunidad',
	templateUrl: './vista-comunidad.component.html',
	styleUrl: './vista-comunidad.component.css'
})
export class VistaComunidadComponent {

	constructor(private route: ActivatedRoute, private comunidadService: ComunidadService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

	comunidad: Comunidad = new Comunidad();
	post = { description: '', title: '', }
	postError = '';

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id') ?? '';
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

	createPost() {
		if (this.post.description == '') {
			this.postError = 'Description is required';
			return
		}
		if (this.post.title == '') {
			this.postError = 'Title is required';
			return
		}

		this.postError = '';
	}
}
