//const noteContainer = getElementsByClassName("note-container");
const myDb = new DB();
let myNote = new Note("My First Project");
if (!myDb.contains(myNote)) {
  myDb.Save(myNote);
}

// <div class="note-object">
//   <h2 class="note-title"></h2>
//   <p class="note-body"></p>
// </div>
