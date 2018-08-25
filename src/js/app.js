import "../../node_modules/picnic/picnic.min.css";
import "../styles/app.css";

import { ItemCtrl } from './item';
import { UICtrl } from './ui';

const App = (function(ItemCtrl, UICtrl){
  
  return {
    init: function(){
      // get items from data structure
      const items = ItemCtrl.getItems();

      UICtrl.createItemsList(items);
    }
  }

})(ItemCtrl, UICtrl);

App.init();