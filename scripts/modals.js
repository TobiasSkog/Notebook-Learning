import { dbInstance } from './services.js';

export default class Modals {
  searchModal = document.getElementById('search');
  favoriteImg = document.getElementById('fav-image');
  statsModal = document.getElementById('stats');
  settingsModal = document.getElementById('settings');
  searchButton = document.getElementById('search-button');
  statsButton = document.getElementById('stats-button');
  settingsButton = document.getElementById('settings-button');
  favoriteButton = document.getElementById('fav-button');
  kmsButton = document.getElementById('btn-kms');
  importInput = document.getElementById('import-input');
  exportButton = document.getElementById('btn-export');
  closeSearchButton = document.getElementById('close-search');


  constructor() {
    this.setupEventListeners();
  }
  setupEventListeners() {
    this.searchButton.addEventListener('click', () => this.toggleModal(this.searchModal));
    this.statsButton.addEventListener('click', () => this.toggleModal(this.statsModal));
    this.settingsButton.addEventListener('click', () => this.toggleModal(this.settingsModal));
    this.favoriteButton.addEventListener('click', () => this.toggleFavorite(this.favoriteImg));
    this.closeSearchButton.addEventListener('click', () => this.toggleModal(this.searchModal));
    this.kmsButton.addEventListener('click', () => this.confirmKms());
    this.importInput.addEventListener('change', () => this.importNotes());
    this.exportButton.addEventListener('click', () => this.exportNotes());

    window.addEventListener('click', (event) => {
      if (event.target === this.searchModal) {
        this.closeModal(this.searchModal);
      } else if (event.target === this.statsModal) {
        this.closeModal(this.statsModal);
      } else if (event.target === this.settingsModal) {
        this.closeModal(this.settingsModal);
      }
    });
  }
  confirmKms() {
    const isConfirmed = confirm("Are you sure you want to clear the local storage?");
    if (isConfirmed) {
      dbInstance.kms();
    } else {
      console.log("User cancelled action.");
    }
  }
  toggleFavorite(element) {
    if (element.className != "fav-inactive") {
      element.src = "../img/fav.png"
      element.className = "fav-inactive";
      dbInstance.loadAllNotes()
    }
    else if (element.className != "fav-active") {
      element.src = "../img/favPressed.png"
      element.className = "fav-active";
      dbInstance.loadFavoriteNotes();
    }
  }
  toggleModal(modal) {
    if (modal) {
      modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
    }
  }

  download(content, fileName, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });

    if (navigator.msSaveOrOpenBlob) {
      // IE and Edge Browsers
      navigator.msSaveOrOpenBlob(file, fileName);
    } else {
      const url = URL.createObjectURL(file, fileName);
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  exportNotes() {
    const jsonData = dbInstance.export();
    this.download(jsonData, 'MyNotes.json', 'application/json');
  }

  importNotes() {
    const [file] = document.getElementById('import-input').files;
    if (file) {
      dbInstance.import(file);
    }
  }
}