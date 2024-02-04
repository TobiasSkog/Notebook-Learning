import { modalsInstance, renderInstance, searchInstance } from './services.js';
import Note from './note.js';
export default class DB {
	#noteContainerName = "noteContainer";
	#dbNotesContainer = [];
	constructor() {
		this.refreshDBContainer();
	}

	refreshDBContainer() {
		const storedData = JSON.parse(localStorage.getItem(this.#noteContainerName) || '[]');

		this.#dbNotesContainer = storedData.map((note) => {
			if (note) {
				return new Note(note)
			}
		});
	}

	save(object) {
		if (object && object instanceof Note) {
			this.#dbNotesContainer.push(object);
		}
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
		renderInstance.renderAllNotes(this.#dbNotesContainer);
	}

	loadFavoriteNotes() {
		renderInstance.clearNotePreview();

		this.#dbNotesContainer.forEach(note => {
			if (note.favorite === true) {
				renderInstance.renderNotePreview(note);
			}
		});
	}

	searchForNotesWithTags(tags) {
		renderInstance.clearNotePreview();

		const foundNotes = this.#dbNotesContainer.filter(note => note.tags.some(tag => tags.includes(tag)));
		foundNotes.forEach(note => {
			renderInstance.renderNotePreview(note);
		});
	}

	// loadActiveNote(id) {
	// 	const note = this.openNoteForEditing(id);
	// 	renderInstance.renderMainContent(note);
	// 	renderInstance.renderActiveNotePreview(id);
	// }

	getActiveNote(id) {
		return this.#dbNotesContainer.find(note => note.id === id);
	}

	remove(noteToRemove) {
		const index = this.#dbNotesContainer.findIndex((note) => note.id === noteToRemove.id);
		this.#dbNotesContainer.splice(index, 1);
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

	kms() {
		localStorage.removeItem(this.#noteContainerName);
		this.#dbNotesContainer = [];
		renderInstance.clearAll();
	}
}



// const foundNotes = [];

// this.#dbNotesContainer.forEach(note => {
// 	tags.forEach(tag => {
// 		if (note.tags.includes(tag)) {
// 			if (!foundNotes.includes(note)) {
// 				foundNotes.push(note);
// 			}
// 		}
// 	});
// });