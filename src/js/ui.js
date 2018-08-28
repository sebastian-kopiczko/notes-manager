import { NoteCtrl } from "./note";

export const UICtrl = (function(){
  const selectors = {
    nav: 'nav',
    alert: '.alert',
    titleInput: '#title-input',
    priorityInput: '#priority-input',
    dateInput: '#date-input',
    bodyInput: '#body-input',
    notesList: '#notes-list',
    notesListItem: '.list-item',
    addButton: '.add-button',
    updateButton: '.update-button',
    deleteButton: '.delete-button',
    backButton: '.back-button'
  }
  const getTodayDate = function(){
    const dateNow = new Date();
    let dateUTC = new Date(Date.UTC(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()))
    return dateUTC.toISOString().slice(0, 10);
  }
  return {
    getSelectors: function(){
      return selectors;
    },
    getNotesInput: function(){
      return {
        title: document.querySelector(selectors.titleInput).value,
        priority: document.querySelector(selectors.priorityInput).value,
        date: document.querySelector(selectors.dateInput).value,
        body: document.querySelector(selectors.bodyInput).value
      }
    },
    createNotesList: function(notes){
      let html = '';
      notes.forEach(note => {
        html += `
          <li class="list-item card" id="note-${note.id}">
            <header>
              <h3 class="list-item__heading">${note.title}</h3>
              <span class="label">${note.priority}</span>
              <span class="label date">${note.date}</span>
            </header>
            <p class="list-item__body">${note.body}</p>
            <footer>
              <a href="#" class="button success edit-note">edit</a>
              <a href="#" class="button error delete-note">delete</a>
            </footer>
          </li>
        `   
      });
      const list = document.getElementById('notes-list');
      list.insertAdjacentHTML('afterbegin', html);
    },
    addNote: function(note){
      const list = document.querySelector(selectors.notesList);
      const li = document.createElement('li');
      li.className = 'list-item card';
      li.id = `note-${note.id}`;
      li.innerHTML = `
        <header>
          <h3 class="list-item__heading">${note.title}</h3>
          <span class="label">${note.priority}</span>
          <span class="label date">${note.date}</span>
        </header>
        <p class="list-item__body">${note.body}</p>
        <footer>
          <a href="#" class="button success edit-note">edit</a>
          <a href="#" class="button error delete-note">delete</a>
        </footer>
      `
      list.insertAdjacentElement('beforeend', li);
      document.querySelector(selectors.notesList).style.display = 'block';
    },
    updateNoteListItem: function(note){
      let notesListItems = Array.from(document.querySelectorAll(selectors.notesListItem));

      notesListItems.forEach(listItem => {
        const listItemId = listItem.getAttribute('id');

        if(listItemId === `note-${note.id}`){
          console.log(listItem.getElementsByTagName('header'));
          listItem.getElementsByTagName('header')[0].innerHTML = `
            <h3 class="list-item__heading">${note.title}</h3>
            <span class="label">${note.priority}</span>
            <span class="label date">${note.date}</span>
          `
          listItem.getElementsByTagName('p')[0].innerHTML = note.body;
        }
      });
    },
    showEditState: function(){
      UICtrl.showElement(selectors.updateButton, 'inline-block');
      UICtrl.showElement(selectors.deleteButton, 'inline-block');
      UICtrl.showElement(selectors.backButton, 'inline-block');
      UICtrl.hideElement(selectors.addButton);
    },
    clearEditState: function(){
      UICtrl.clearInputs();
      UICtrl.hideElement(selectors.updateButton);
      UICtrl.hideElement(selectors.deleteButton);
      UICtrl.hideElement(selectors.backButton);
      UICtrl.showElement(selectors.addButton, 'inline-block');
    },
    setInputsToEdit(){
      const note = NoteCtrl.getCurrentNote();
      document.querySelector(selectors.titleInput).value = note.title;
      document.querySelector(selectors.bodyInput).value = note.body;
      document.querySelector(selectors.priorityInput).value = note.priority;
      document.querySelector(selectors.dateInput).value = note.date;

      UICtrl.showEditState();
    },
    clearInputs: function(){
      document.querySelector(selectors.titleInput).value = '';
      document.querySelector(selectors.bodyInput).value = '';
      document.querySelector(selectors.priorityInput).options[0].selected = true;
      document.querySelector(selectors.dateInput).value = getTodayDate();
    },
    showAlert(className, alertText){
      const nav = document.querySelector(selectors.nav);
      const alertDiv = document.createElement('div');
      alertDiv.className = (`alert label ${className}`);
      alertDiv.appendChild(document.createTextNode(alertText));
      nav.insertAdjacentElement('afterend', alertDiv);
      setTimeout(()=>{
        UICtrl.clearAlert();
      }, 2500)
    },
    clearAlert(){
      const alert = document.querySelector(selectors.alert);
      if(alert){
        alert.remove();
      }
    },
    showElement: function(elem, displayStyle){
      document.querySelector(elem).style.display = displayStyle;
    },
    hideElement: function(elem){
      document.querySelector(elem).style.display = 'none';
    }
  }
})();