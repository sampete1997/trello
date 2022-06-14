import {legacy_createStore as createStore,combineReducers} from 'redux'
import boardReducer from './components/reducers/boardReducer'


const rootReducer = combineReducers({
    board:boardReducer,
  
})



const store = createStore(rootReducer)


export default store