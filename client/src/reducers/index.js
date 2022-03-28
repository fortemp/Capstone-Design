import { combineReducers } from "redux";
import authReducer from './auth_reducer';
 
const rootReducer = combineReducers({
    authReducer//useSelector에서 state.auth로 가져옴
})

export default rootReducer;