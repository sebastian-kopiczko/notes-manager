import { StorageCtrl } from "./storage";

export const NoteCtrl = (function(){
  // notes item constructor
  const Note = function(id, title, body, priority, date){
    this.id = id;
    this.title = title;
    this.body = body;
    this.priority = priority;
    this.date = date;
  }

  // data structure and state
  const data = {
    notes: StorageCtrl.getStorageNotes(),
    currentNote: null
  }

  return {
    addNote: function(title, body, priority, date){
      let id;
      if(data.notes.length > 0){
        id = data.notes[data.notes.length - 1].id + 1;
      } else {
        id = 0;
      }

      const newNote = new Note(id, title, body, priority, date);
      data.notes.push(newNote);

      return newNote;
    },
    getNotes: function(){
      return data.notes;
    },
    updateNote: function(title, body, priority, date){
      let match = null;
      data.notes.forEach(note => {
        if(note.id === data.currentNote.id){
          note.title = title;
          note.body = body; 
          note.priority = priority;
          note.date = date;
          match = note;
        }
      });
      return match;
    },
    getNoteById: function(id){
      let matchNote = null;
      data.notes.forEach(note => {
        if(note.id == id){
          matchNote = note;
        }
      });
      return matchNote;
    },
    setCurrentNote: function(note){
      data.currentNote = note;
    },
    getCurrentNote: function(){
      return data.currentNote;
    },
    logData: function(){
      return data;
    }
  }
})();