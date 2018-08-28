export const StorageCtrl = (function () {
  return {
    addStorageNote: function (note) {
      let notes;
      if (localStorage.getItem('notes') === null) {
        notes = [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
      } else {
        notes = JSON.parse(localStorage.getItem('notes'));
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
      }
    },
    getStorageNotes: function(){
      let notes;
      if(localStorage.getItem('notes') === null) {
        notes = [];
      } else {
        notes = JSON.parse(localStorage.getItem('notes'));
      }
      return notes;
    },
    updateStorageNote: function(updatedNote){
      let notes = JSON.parse(localStorage.getItem('notes'));
      notes.forEach((note, index) => {
        if(updatedNote.id === note.id){
          notes.splice(index, 1, updatedNote);
        }
      });
      localStorage.setItem('notes', JSON.stringify(notes));
    },
    deleteStorageNote: function(deletedNoteId){
      let notes = JSON.parse(localStorage.getItem('notes'));
      notes.forEach((note, index) => {
        if(deletedNoteId === note.id){
          notes.splice(index, 1);
        }
      });
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }
})();