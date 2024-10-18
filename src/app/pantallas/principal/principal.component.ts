import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


type Book = {
	title: string;
	content: string;
	author: string;
	image: string;
	stars: number;
	id: number;
}

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
	books: Book[] = [
		{
			id: 1,
			title: "Unruly: The Ridiculous History of England's Kings and Queens",
			content: "A rollicking history of England's earliest kings and queens, a story of narcissists, excessive beheadings, middle-management insurrection, and uncivil wars.",
			author: "David Mitchell",
			image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1684764813i/152034931._SY180_.jpg",
			stars: 4
		},
		{
			id: 2,
			title: "Behind Every Good Man ",
			content: "A wronged wife goes toe to toe with her cheating husband at the polls in this hilarious and heart-lifting novel by the bestselling author of Don’t Forget to Write.",
			author: "Sara Goodman Confino",
			image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1708200930i/202260557._SX120_.jpg",
			stars: 2
		}
	]
}
