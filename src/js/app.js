import "../../node_modules/picnic/picnic.min.css";
import "../styles/app.css";

import { ItemCtrl } from './item';
import { UICtrl } from './ui';

const App = (function(ItemCtrl, UICtrl){
  
  return {
    init: function(){
      console.log('init app')
    }
  }

})(ItemCtrl, UICtrl);

App.init();