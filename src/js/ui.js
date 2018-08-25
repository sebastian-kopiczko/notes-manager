export const UICtrl = (function(){
  return {
    createItemsList: function(items){
      let html = '';
      items.forEach(item => {
        html += `
          <li class="list-item card">
            <header>
              <h3 class="list-item__heading">${item.title}</h3>
              <span class="label">${item.priority}</span>
              <span class="label date">${item.dueDate}</span>
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