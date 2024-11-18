import { Component, Input, AfterViewInit } from '@angular/core';
import { FeedPost } from '../../entidades/FeedPost';
import { Libro } from '../../entidades/Libro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrl: './feed-post.component.css'
})
export class FeedPostComponent implements AfterViewInit {

  @Input() post: FeedPost | null = null;

  constructor(private router: Router) { }

  verLibro() {
    this.router.navigate(['/book', this.post?.post?.book_id])
  }

  urlFotoPerfil = '';
  defaultImage = './default-profile.png';


  ngAfterViewInit() {
    this.urlFotoPerfil = `http://localhost:8080/users/${this.post?.post?.id}/picture`;
  }
}
