export const UICtrl = (function(){
  const selectors = {
    titleInput: '#title-input',
    priorityInput: '#priority-input',
    dateInput: '#date-input',
    bodyInput: '#body-input',
    addButton: '.add-button'
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
    createNotesList: function(items){
      let html = '';
      items.forEach(item => {
        html += `
          <li class="list-item card">
            <header>
              <h3 class="list-item__heading">${item.title}</h3>
              <span class="label">${item.priority}</span>
              <span class="label date">${item.date}</span>
            </header>
            <p class="list-item__body">${item.body}</p>
            <footer>
              <a href="#" class="button success edit-item">edit</a>
              <a href="#" class="button error delete-item">delete</a>
            </footer>
          </li>
        `   
      });
      const list = document.getElementById('notes-list');
      console.log(list);
      list.insertAdjacentHTML('afterbegin', html);
    }
  }
})();