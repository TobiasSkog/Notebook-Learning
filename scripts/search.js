import { dbInstance, modalsInstance, searchInstance } from './services.js';

export default class Search {
  #tags = [];
  input = document.getElementById('search-tags-input');
  tagsContainer = document.getElementById('search-tags');
  removeTagsButton = document.getElementById('remove-tags');
  constructor() {
    this.setupEventListeners();
  }
  setupEventListeners() {
    this.removeTagsButton.addEventListener('click', () => this.removeAllSearchedTags());
    this.tagsContainer.addEventListener('click', (event) => this.removeSpecificTag(event.target));
    this.input.addEventListener('keyup', (event) => (event.key === 'Enter') && this.checkInputValue(this.input.value));
  }

  checkInputValue(tag) {
    if (tag) {
      this.input.value = "";
      this.#tags.push(tag);
      this.insertSearchedTag(tag);
      dbInstance.searchForNotesWithTags(this.#tags);
    }
  }
  removeAllSearchedTags() {
    this.tagsContainer.innerHTML = "";
    this.#tags = [];
    dbInstance.loadAllNotes();
  }
  removeSpecificTag(clickedElement) {
    const removeTag = (element) => {
      const specificTagContainer = element.closest('.tag-container');
      if (specificTagContainer) {
        const tagValue = specificTagContainer.querySelector('.tag').textContent;
        const index = this.#tags.indexOf(tagValue);
        if (index !== -1) {
          this.#tags.splice(index, 1);
        }
        specificTagContainer.remove();
        if (this.#tags.length > 0) {
          dbInstance.searchForNotesWithTags(this.#tags);
        } else {
          dbInstance.loadAllNotes();
        }
      }
    };

    if (clickedElement.classList.contains('remove-tag')) {
      removeTag(clickedElement);
    }
  }
  insertSearchedTag(tag) {
    this.tagsContainer.innerHTML += `
      <div class="tag-container">
        <p class="tag">${tag}</p>
        <p class="remove-tag">&times;</p>
      </div>`;
  }
}