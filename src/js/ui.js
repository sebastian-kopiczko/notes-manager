export const UICtrl = (function(){
  const selectors = {
    nav: 'nav',
    alert: '.alert',
    titleInput: '#title-input',
    priorityInput: '#priority-input',
    dateInput: '#date-input',
    bodyInput: '#body-input',
    addButton: '.add-button',
    notesList: '#notes-list'
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
              <a href="#" class="button success edit-item">edit</a>
              <a href="#" class="button error delete-item">delete</a>
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
          <a href="#" class="button success edit-item">edit</a>
          <a href="#" class="button error delete-item">delete</a>
        </footer>
      `
      list.insertAdjacentElement('beforeend', li);
      document.querySelector(selectors.notesList).style.display = 'block';
    },
    showAlert(className, alertText){
      const nav = document.querySelector(selectors.nav);
      const alertDiv = document.createElement('div');
      alertDiv.className = (`alert label ${className}`);
      alertDiv.appendChild(document.createTextNode(alertText));
      nav.insertAdjacentElement('afterend', alertDiv);
      setTimeout(()=>{
        this.clearAlert();
      }, 2500)
    },
    clearAlert(){
      const alert = document.querySelector(selectors.alert);
      if(alert){
        alert.remove();
      }
    },
    clearInputs: function(){
      document.querySelector(selectors.titleInput).value = '';
      document.querySelector(selectors.bodyInput).value = '';
      document.querySelector(selectors.priorityInput).options[0].selected = true;
      document.querySelector(selectors.dateInput).value = getTodayDate();
    },
    hideList: function(){
      document.querySelector(selectors.notesList).style.display = 'none';
    }
  }
})();