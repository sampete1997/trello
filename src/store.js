import {legacy_createStore as createStore,combineReducers} from 'redux'
import boardReducer from './components/reducers/boardReducer';
import listReducer from './components/reducers/listReducer';


const rootReducer = combineReducers({
    board:boardReducer,
    list:listReducer
  
})



const store = createStore(rootReducer)


export default store