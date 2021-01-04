 import {combineReducers} from 'redux'
import {userReducer} from './userReducer.js'
import {searchReducer} from './searchReducer.js'
import {CartReducer} from './cartreducer'
import {drawerReducer} from './drawerReducer'
import {couponReducer} from './couponreducer'
import {codReducer} from './codreducer'
 const rootReducer = combineReducers({
     user:userReducer,
     search:searchReducer,
     cart:CartReducer,
     drawer:drawerReducer,
     coupona:couponReducer,
    cod:codReducer
    });





 export default rootReducer;