import { NoteCtrl } from "./note";

export const UICtrl = (function () {
  const selectors = {
    nav: 'nav',
    alert: '.alert',
    noteEditor: '.note__editor',
    noteFormHeading: '#note-form h3',
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
  const getTodayDate = function () {
    const dateNow = new Date();
    let dateUTC = new Date(Date.UTC(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()))
    return dateUTC.toISOString().slice(0, 10);
  }
  return {
    getSelectors: function () {
      return selectors;
    },
    getNotesInput: function () {
      const priorityInput = document.querySelector(selectors.priorityInput);
      return {
        title: document.querySelector(selectors.titleInput).value,
        priority: {
          val: priorityInput.value,
          text: priorityInput.selectedOptions[0].text
        },
        date: document.querySelector(selectors.dateInput).value,
        body: document.querySelector(selectors.bodyInput).value
      }
    },
    createNotesList: function (notes) {
      let html = '';
      notes.forEach(note => {
        html += `
          <li class="note list-item stack" id="note-${note.id}">
            <div class="note__top-bar">
              <span class="note__priority button ${note.priorityVal}">${note.priorityText}</span>
              <span class="note__date date">${note.date}</span>
              <a href="#" class="button edit-note">Edytuj</a>
            </div>
            <div class="note__inner">
              <h3 class="note__title">${note.title}</h3>
              <p class="block note__body">${note.body}</p>
            </div>
          </li>
        `
      });
      const list = document.getElementById('notes-list');
      list.insertAdjacentHTML('afterbegin', html);
    },
    addNoteListItem: function (note) {
      const list = document.querySelector(selectors.notesList);
      const li = document.createElement('li');
      li.className = 'note list-item stack';
      li.id = `note-${note.id}`;
      li.innerHTML = `
        <div class="note__top-bar">
          <span class="note__priority button ${note.priorityVal}">${note.priorityText}</span>
          <span class="note__date date">${note.date}</span>
          <a href="#" class="button edit-note">Edytuj</a>
        </div>
        <div class="note__inner">
          <h3 class="note__title">${note.title}</h3>
          <p class="block note__body">${note.body}</p>
        </div>
      `
      list.insertAdjacentElement('beforeend', li);
      document.querySelector(selectors.notesList).style.display = 'block';
    },
    deleteNoteListItem: function (id) {
      const noteId = `#note-${id}`;
      const noteToDelete = document.querySelector(noteId);
      noteToDelete.remove();
    },
    updateNoteListItem: function (note) {
      let notesListItems = Array.from(document.querySelectorAll(selectors.notesListItem));

      notesListItems.forEach(listItem => {
        const listItemId = listItem.getAttribute('id');

        if (listItemId === `note-${note.id}`) {
          listItem.getElementsByClassName('note__top-bar')[0].innerHTML = `
            <span class="note__priority">${note.priority}</span>
            <span class="note__date date">${note.date}</span>
            <a href="#" class="button success edit-note">edit</a>
          `
          listItem.getElementsByTagName('p')[0].innerHTML = note.body;
        }
      });
    },
    showEditState: function () {
      document.querySelector(selectors.noteFormHeading).textContent = 'Edycja notatki';
      UICtrl.showElement(selectors.updateButton, 'inline-block');
      UICtrl.showElement(selectors.deleteButton, 'inline-block');
      UICtrl.showElement(selectors.backButton, 'inline-block');
      UICtrl.hideElement(selectors.addButton);
    },
    clearEditState: function () {
      document.querySelector(selectors.noteFormHeading).textContent = 'Dodaj notatkę';
      UICtrl.clearInputs();
      UICtrl.hideElement(selectors.updateButton);
      UICtrl.hideElement(selectors.deleteButton);
      UICtrl.hideElement(selectors.backButton);
      UICtrl.showElement(selectors.addButton, 'inline-block');
    },
    setInputsToEdit() {
      const note = NoteCtrl.getCurrentNote();
      document.querySelector(selectors.titleInput).value = note.title;
      document.querySelector(selectors.bodyInput).value = note.body;
      document.querySelector(selectors.priorityInput).value = note.priority;
      document.querySelector(selectors.dateInput).value = note.date;

      UICtrl.showEditState();
    },
    clearInputs: function () {
      document.querySelector(selectors.titleInput).value = '';
      document.querySelector(selectors.bodyInput).value = '';
      document.querySelector(selectors.priorityInput).options[0].selected = true;
      document.querySelector(selectors.dateInput).value = getTodayDate();
    },
    showAlert(className, alertText) {
      const nav = document.querySelector(selectors.noteEditor);
      const alertDiv = document.createElement('div');
      alertDiv.className = (`alert label ${className}`);
      alertDiv.appendChild(document.createTextNode(alertText));
      nav.insertAdjacentElement('afterend', alertDiv);
      setTimeout(() => {
        UICtrl.clearAlert();
      }, 2500)
    },
    clearAlert() {
      const alert = document.querySelector(selectors.alert);
      if (alert) {
        alert.remove();
      }
    },
    showElement: function (elem, displayStyle) {
      document.querySelector(elem).style.display = displayStyle;
    },
    hideElement: function (elem) {
      document.querySelector(elem).style.display = 'none';
    }
  }
})();