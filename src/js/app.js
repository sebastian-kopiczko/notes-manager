import "../../node_modules/picnic/picnic.min.css";
import "../styles/app.css";

import { StorageCtrl } from './storage';
import { NoteCtrl } from './note';
import { UICtrl } from './ui';

const App = (function(NoteCtrl, StorageCtrl, UICtrl){
  const initEventListeners = function(){
    const UISelectors = UICtrl.getSelectors();

    document.querySelector(UISelectors.addButton).addEventListener('click', itemAddSubmit);
    document.querySelector(UISelectors.notesList).addEventListener('click', noteEditClick);
  }
 
  const itemAddSubmit = function(e){
    const input = UICtrl.getNotesInput();
    if(input.title === ''){
      UICtrl.showAlert('error', 'Wprowadz tytul notatki')
    } else if(input.body === ''){
      UICtrl.showAlert('error', 'Wprowadz tresc notatki')
    } 
    else {
      const newNote = NoteCtrl.addNote(input.title, input.body, input.priority, input.date);
      UICtrl.clearInputs();
      UICtrl.addNote(newNote);
      StorageCtrl.storeNote(newNote);
      UICtrl.showAlert('success', 'Notatka dodana pomyslnie')
    }
    e.preventDefault();
  }

  const noteEditClick = function(e){
    if(e.target.classList.contains('edit-note')){
      console.log(`editing note`)
    }
    e.preventDefault();
  }
  return {
    init: function(){
      UICtrl.clearEditState();
      // get items from data structure
      const notes = NoteCtrl.getNotes();
      if(notes.length === 0){
        UICtrl.hideElement('#notes-list');
      } else{
        UICtrl.createNotesList(notes);
      }
      initEventListeners();
    }
  }

})(NoteCtrl, StorageCtrl, UICtrl);

App.init();