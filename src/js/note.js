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
    notes: [
      {id: 0, title: 'Test note 1 title', body: 'Test note 1 body', priority: 'low', date: '2018-08-20'},
      {id: 1, title: 'Test note 2 title', body: 'Test note 2 body', priority: 'high', date: '2018-08-22'}
    ],
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
    logData: function(){
      return data;
    }
  }
})();