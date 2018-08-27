export const StorageCtrl = (function () {
  return {
    storeNote: function (note) {
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
    }
  }
})();