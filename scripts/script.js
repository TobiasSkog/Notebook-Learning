let myDb = new DB();
// let myNote = new Note({
// 	title: "This is a Javascript Class",
// 	content: "This is a test for the greater good of mankind lets see if this works, hurr durr durrrrrr."
// });
//myDb.save(myNote);
myDb.loadAllNotes();

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