import { Component, OnInit } from '@angular/core';
import { FeedPost } from '../../entidades/FeedPost';
import { FeedService } from '../../services/feed.service';

@Component({
	selector: 'app-principal',
	templateUrl: './principal.component.html',
	styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
	posts: FeedPost[] = [];
	loading = true;

	constructor(private feedService: FeedService) { }

	ngOnInit(): void {
		this.feedService.getFeed().subscribe(posts => {
			console.log(posts);
			this.posts = posts;
			this.loading = false;
		});
	}
}
