let myDb = new DB();
//myDb.kms();
myDb.loadAllNotes();

//testing shit
const noteIsActive = document.getElementById("note-object");


function confirmKms() {
	const isConfirmed = confirm("Are you sure you want to clear the local storage?");
	console.log(isConfirmed)
	if (isConfirmed) {
		myDb.kms();
	} else {
		console.log("User cancelled action.");
	}
}

function download(content, fileName, contentType) {
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
function exportNotes() {
	const jsonData = myDb.export();
	download(jsonData, 'MyNotes.json', 'application/json');
}

function importNotes() {
	const [file] = document.getElementById('import-input').files;
	if (file) {
		myDb.import(file);
	}
}

function onClickNote(id) {
	myDb.loadActiveNote(id);
	//myDb.loadActiveNote(myDb.openNoteForEditing(id));
	//inactiveNoteStyle();
	//apapapapa(id, noteIsActive);
	activeNoteStyle(id);
}

function apapapapa(noteIsActive) {
	//noteIsActive.classList.toggle("note-object-active");
	if (noteIsActive.classList.contains("note-object-active")) {
		noteIsActive.classList.replace("note-object-active", "note-object");
	} else {
		noteIsActive.classList.replace("note-object", "note-object-active");
	}
}

function inactiveNoteStyle() {
	//noteContainerElement
	const makeInactive = document.getElementById("note-object-active");
	if (makeInactive != null && makeInactive.classList.contains("note-object-active")) {
		makeInactive.classList.replace("note-object-active", "note-object");
	} else if(makeInactive == null){
		makeInactive.classList.add("note-object");
	}

}

function activeNoteStyle(id) {
	const makeActive = document.getElementById(id);
	//makeActive.classList.remove("note-object");
	makeActive.classList.add("note-object-active");
}




/**************************************************************************/
/******************* IF YOU NEED DEFAULT DATA ADD THIS ********************/
/**************************************************************************/
// let myNote = new Note({
// 	title: "This is a Javascript Class",
// 	content: "This is a test for the greater good of mankind lets see if this works, hurr durr durrrrrr."
// });
// myDb.save(myNote);
/**************************************************************************/