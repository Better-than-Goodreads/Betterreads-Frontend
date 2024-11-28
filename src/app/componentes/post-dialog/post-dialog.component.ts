import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComunidadService } from '../../services/comunidad.service';
import { Comunidad } from '../../entidades/Comunidad';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PostDialogComponent>,
	private comunidadService: ComunidadService,
	@Inject(MAT_DIALOG_DATA) public data: { comunidad: Comunidad }
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
		this.comunidadService.createPost(this.data.comunidad.id, this.postForm.value.title, this.postForm.value.description).subscribe({
			next: (data) => {
				console.log('Post creado:', data);
				this.dialogRef.close(data);
			},
			error: (e) => {
				this.postForm.setErrors({ 'error': e.error.error.d || "Error creating post" });
			}
		});
    }
  }
}
