import { dbInstance, modalsInstance, searchInstance } from './services.js';
import Note from './note.js';

// dbInstance.doNotUseThisThanks();

//dbInstance.save();




dbInstance.loadAllNotes();

//Search function:
//dbInstance.loadNotesWithTags(["apa"])

function onClickNote(id) {
	dbInstance.loadActiveNote(id);
	//myDb.loadActiveNote(myDb.openNoteForEditing(id));
	//inactiveNoteStyle();
	//apapapapa(id, noteIsActive);

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