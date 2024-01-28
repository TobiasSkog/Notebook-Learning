class Note {
  constructor(title) {
    this._title = title;
    this._created = new Date();
    this._lastEdit = new Date();
    this._content = "";
    this._favorite = false;
    this._tags = new Array();
    this.images = new Array();
  }

  fetchFullNote() {
    return "lul";
  }

  previewNote() {
    let preview = {
      title: this._title,
      content: this._content,
    };
    return preview;
  }
}
