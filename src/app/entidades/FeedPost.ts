export class FeedPost {
	type: string = '';
	post: FeedPostData = new FeedPostData();
}

export class FeedPostData {
	id: string = '';
	username: string = '';
	book_id: string = '';
	book_title: string = '';
	book_author: string = '';
	book_description: string = '';
	publication_date: string = '';
	rating: number = 0;
}
