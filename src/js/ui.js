export const UICtrl = (function(){
  const selectors = {
    titleInput: '#title-input',
    priorityInput: '#priority-input',
    dateInput: '#date-input',
    bodyInput: '#body-input',
    addButton: '.add-button'
  }
  const getTodayDate = function(){
    const dateNow = new Date();
    let dateUTC = new Date(Date.UTC(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()))
    // return dateUTC.toISOString().slice(0, 10).replace(/-/g, '');
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
    },
    clearInputs: function(){
      document.querySelector(selectors.titleInput).value = '';
      document.querySelector(selectors.bodyInput).value = '';
      document.querySelector(selectors.priorityInput).options[0].selected = true;
      document.querySelector(selectors.dateInput).value = getTodayDate();
    }
  }
})();