import { dbInstance, modalsInstance, searchInstance } from './services.js';

export default class Render {
  #noteContainerElement = document.getElementById("note-container");
  #contentContainerElement = document.getElementById("content-container");
  constructor() {
    this.setupEventListeners();
  }
  getNoteContainer = () => this.#noteContainerElement;
  getContentContainer = () => this.#contentContainerElement;

  setupEventListeners() {
    this.#noteContainerElement.addEventListener('click', (event) => {
      const clickedNote = event.target.closest('.note-object');
      if (clickedNote) {
        if (clickedNote.classList.contains('note-object-active')) {
          return;
        }
        const clickedNoteId = clickedNote.id;
        const note = dbInstance.getActiveNote(clickedNoteId);
        this.renderActiveNotePreview(clickedNoteId);
        this.renderMainContent(note);
      }
    })
  }
  clearNotePreview() {
    this.#noteContainerElement.innerHTML = "";
  }

  clearMainContent() {
    this.#contentContainerElement.innerHTML = "";
  }
  clearAll() {
    this.#noteContainerElement.innerHTML = "";
    this.#contentContainerElement.innerHTML = "";
  }
  renderAllNotes(notesArray) {
    this.clearAll();

    notesArray.forEach(note => {
      this.renderNotePreview(note);
    });
  }
  renderNotePreview(note) {
    this.#noteContainerElement.innerHTML += `
      <div class="note-object" id="${note.id}">
        <h2 class="note-title"> ${note.title} </h2>
        <p class="note-body"> ${note.getContentPreview()} </p>
      </div >`;
  }

  renderMainContent(note) {
    this.#contentContainerElement.innerHTML = `
      <h2 class="content-title">${note.title}</h2>
      <h3 class="content-edited">${note.lastEdit}</h3>
      <p class="content-body">${note.content}</p>`;
  }

  renderActiveNotePreview(id) {
    const noteObjects = this.#noteContainerElement.querySelectorAll('.note-object');

    noteObjects.forEach(container => {
      if (container.id === id) {
        container.classList.toggle('note-object-active');
      } else {
        container.classList.remove('note-object-active');
      }
    });
  }
}

// inactiveNoteStyle(element) {

// }
// activeNoteStyle(id) {
//   const makeActive = document.getElementById(id);
//   makeActive.classList.add("note-object-active");
// }