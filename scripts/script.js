const myDb = new DB();

const searchModal = document.getElementById('search');
const favoriteImg = document.getElementById('fav-image');
const statsModal = document.getElementById('stats');
const settingsModal = document.getElementById('settings');
document.getElementById('search-button').addEventListener('click', openSearch);
document.getElementById('stats-button').addEventListener('click', openStatistics);
document.getElementById('settings-button').addEventListener('click', openSettings);



myDb.loadAllNotes();

//myDb.loadNotesWithTags(["ost", "hezt", "apa"])


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
function toggleFavorite(element) {
	if (element.className != "fav-inactive") {
		element.src = "../img/fav.png"
		element.className = "fav-inactive";
		// DB fetch ALL notes
		myDb.loadAllNotes()
	}
	else if (element.className != "fav-active") {
		element.src = "../img/favPressed.png"
		element.className = "fav-active";
		// Db fetch ONLY favorite marked notes
		myDb.loadFavoriteNotes();
	}
}
function openSearch() {
	searchModal.style.display = 'block';
}

function openStatistics() {
	statsModal.style.display = 'block';
}

function openSettings() {
	settingsModal.style.display = 'block';
}

window.addEventListener('click', function (event) {
	if (event.target == searchModal) {
		searchModal.style.display = 'none';
	}
	else if (event.target == statsModal) {
		statsModal.style.display = 'none';

	} else if (event.target == settingsModal) {
		settingsModal.style.display = 'none';
	}
	//add the other optional modals here
});

function closeModal() {
	searchModal.style.display = 'none';
	favoriteModal.style.display = 'none';
	statsModal.style.display = 'none';
	settingsModal.style.display = 'none';
}

/**************************************************************************/
/******************* IF YOU NEED DEFAULT DATA ADD THIS ********************/
/**************************************************************************/
// let myNote = new Note({
// 	title: "The Title",
// 	content: "The smallest test for the greater good of mankind lets see if this works, hurr durr durrrrrr."
// });
// myDb.save(myNote);
/*************************
 *
 *
 *
 *
 *
 * *************************************************/