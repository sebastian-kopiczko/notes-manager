import "../../node_modules/picnic/picnic.min.css";
import "../styles/app.css";

import { StorageCtrl } from './storage';
import { NoteCtrl } from './note';
import { UICtrl } from './ui';

const App = (function(NoteCtrl, StorageCtrl, UICtrl){
  const initEventListeners = function(){
    const UISelectors = UICtrl.getSelectors();

    document.querySelector(UISelectors.addButton).addEventListener('click', itemAddSubmit);
  }
 
  const itemAddSubmit = function(e){
    const input = UICtrl.getNotesInput();
    if(input.title === '' || input.body === ''){
      alert('Uzupelnij tytul i tresc notatki');
    } else {
      const newNote = NoteCtrl.addNote(input.title, input.body, input.priority, input.date);
      UICtrl.clearInputs();
      UICtrl.addNote(newNote);
      StorageCtrl.storeNote(newNote);
    }
    e.preventDefault();
  }

  return {
    init: function(){
      // get items from data structure
      const notes = NoteCtrl.getNotes();
  
      UICtrl.createNotesList(notes);

      initEventListeners();
    }
  }

})(NoteCtrl, StorageCtrl, UICtrl);

App.init();