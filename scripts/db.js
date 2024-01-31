class DB {
	#noteContainerName = "noteContainer";
	#dbNotesContainer = [];
	noteContainerElement = document.getElementById("note-container");
	contentContainerElement = document.getElementById("content-container");

	constructor() {
		this.refreshDBContainer();
	}

	kms() {
		localStorage.removeItem(this.#noteContainerName);
		this.#dbNotesContainer = [];
		this.noteContainerElement.innerHTML = "";
	}
	refreshDBContainer() {
		this.#dbNotesContainer = JSON.parse(localStorage.getItem(this.#noteContainerName) || '[]').map(x => new Note(x));
	}

	save(object) {
		this.#dbNotesContainer.push(object);
		localStorage.setItem(this.#noteContainerName, JSON.stringify(this.#dbNotesContainer));
	}

	openNoteForEditing(note) {
		const result = this.#dbNotesContainer.find(x => x.id === note.id);
		if (result) {
			return result;
		} else {
			console.log("No object with the key was found");
		}
	}

	loadAllNotes() {
		this.noteContainerElement.innerHTML = "";

		this.#dbNotesContainer.forEach(note => {
			this.noteContainerElement.innerHTML +=
				`<div class="note-object">
					<h2 class="note-title"> ${note.title} </h2>
					<p class="note-body"> ${note.getContentPreview()} </p>
				</div >`;
		});
	}

	loadActiveNote(note) {

		contentContainerElement.innerHTML = `
      <h2 class="content-title">My second note</h2>
      <h3 class="content-edited">Last edited 2024-01-28</h3>
      <p class="content-body">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio expedita illo magni
        quasi, praesentium
        enim eos eaque consequuntur dignissimos quo eius nesciunt pariatur est consequatur incidunt sint ipsum facere
        impedit odio illum dolores corporis. Recusandae consequatur sunt, inventore qui sequi fuga deserunt eius iste
        placeat, quos quae odit minus mollitia distinctio nam soluta. Eius quam cumque illo, non natus deleniti eaque
        harum nulla tempora praesentium exercitationem quia ex quaerat quis recusandae neque est atque voluptate
        perspiciatis perferendis incidunt dolor doloremque! Tempora dicta molestias tenetur minima pariatur quis dolorum
        asperiores! Quos?</p>`;
	}

	remove(note) {
		const i = this.#dbNotesContainer.findIndex((x) => x.id === note.id);
		this.#dbNotesContainer.splice(i, 1);
		localStorage.setItem(this.#noteContainerName, JSON.stringify(this.#dbNotesContainer));
	}

	export() {
		return JSON.stringify(this.#dbNotesContainer);
	}

	import(file) {
		const reader = new FileReader();
		reader.addEventListener(
			"load",
			() => {
				this.#dbNotesContainer = JSON.parse(reader.result || '[]').map(x => new Note(x));
				this.loadAllNotes();
			},
			false,
		);
		if (file) {
			reader.readAsText(file);
		}
	}

}