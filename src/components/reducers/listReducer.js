import { getListName} from "../actions/Actions"

const initialState = {

    listName: '',
 
}

function listReducer(state = initialState, action) {

    switch (action.type) {


        case getListName:

            return {
                ...state,

                listName: action.payload
            }
   

        default:
            return state
    }
}

export default listReducer