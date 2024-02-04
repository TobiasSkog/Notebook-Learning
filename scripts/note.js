export default class Note {
	id;
	title;
	created;
	lastEdit;
	content;
	favorite;
	tags;
	images;

	constructor(
		{
			id = crypto.randomUUID(),
			title = "Default title",
			created = new Date(),
			lastEdit = new Date(),
			content = "",
			favorite = false,
			tags = ["test", "cool", "potato"],
			images = [],
		} = {}
	) {

		this.id = id;
		this.title = title;
		this.created = created;
		this.lastEdit = lastEdit;
		this.content = content;
		this.favorite = favorite;
		this.tags = tags;
		this.images = images;
	}

	getContentPreview() {
		return this.content.substring(0, 55) + " ...";
	}

	toggleFavorite() {
		this.favorite = !(this.favorite != false)
	}

	addTag(tag) {
		if (tag) {
			this.tags.push(tag);
		}
	}

	removeTag(tag) {
		if (tag) {
			let i = this.tags.indexOf(tag);
			this.tags.splice(i, 1);
		}
	}

}