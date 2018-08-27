import "../../node_modules/picnic/picnic.min.css";
import "../styles/app.css";

import { NoteCtrl } from './note';
import { UICtrl } from './ui';

const App = (function(NoteCtrl, UICtrl){
  const initEventListeners = function(){
    const UISelectors = UICtrl.getSelectors();

    document.querySelector(UISelectors.addButton).addEventListener('click', itemAddSubmit);
  }
 
  const itemAddSubmit = function(e){
    const input = UICtrl.getNotesInput();
    if(input.title !== '' || input.body !== '' || input.priority !== '' || input.date !== ''){
      const newItem = NoteCtrl.addNote(input.title, input.body, input.priority, input.date);
      console.log(newItem)
      UICtrl.clearInputs();
      UICtrl.addNote(newItem);
    }
    console.log(NoteCtrl.getNotes())
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

})(NoteCtrl, UICtrl);

App.init();