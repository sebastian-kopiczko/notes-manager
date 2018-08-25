import "../../node_modules/picnic/picnic.min.css";
import "../styles/app.css";

const ItemCtrl = require('./item');
const UICtrl = require('./ui');

const App = (function(ItemCtrl, UICtrl){
  console.log('app ctrl here')
})(ItemCtrl, UICtrl);