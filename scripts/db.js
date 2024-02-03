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

	openNoteForEditing(id) {
		const result = this.#dbNotesContainer.find(x => x.id === id);
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
				`<div class="note-object" id="${note.id}" onclick="onClickNote(id)">
					<h2 class="note-title"> ${note.title} </h2>
					<p class="note-body"> ${note.getContentPreview()} </p>
				</div >`;
		});
	}

// 	monkeyIsNote() {

// 		const makeInactive = document.getElementById("note-object-active");

// 		if (this.noteContainerElement.classList.contains("note-object-active")) {
// 			this.noteContainerElement.classList.remove("note-object-active");
// 		}
// }

	loadActiveNote(id) {
		const note = this.openNoteForEditing(id);
		this.contentContainerElement.innerHTML = `
      <h2 class="content-title">${note.title}</h2>
      <h3 class="content-edited">${note.lastEdit}</h3>
      <p class="content-body">${note.content}</p>`;
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
        localStorage.setItem(this.#noteContainerName, JSON.stringify(this.#dbNotesContainer));
			},
			false,
		);
		if (file) {
			reader.readAsText(file);
		}
	}

}