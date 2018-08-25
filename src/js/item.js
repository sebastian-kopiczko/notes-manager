export const ItemCtrl = (function(){
  // notes item constructor
  const Item = function(title, body, priority, date){
    this.title = title;
    this.body = body;
    this.priority = priority;
    this.date = date;
  }

  // data structure and state
  const data = {
    items: [
      {id: 0, title: 'Test note 1 title', body: 'Test note 1 body', priority: 'low', dueDate: '2018-08-20'},
      {id: 1, title: 'Test note 2 title', body: 'Test note 2 body', priority: 'high', dueDate: '2018-08-22'}
    ],
    currentItem: null
  }

  return {
    getItems: function(){
      return data.items;
    },
    logData: function(){
      return data;
    }
  }
})();