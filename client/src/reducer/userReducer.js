export function userReducer(state = null,action){
    switch(action.type) {

      case "LOOGED_IN_USER":

          return action.payload;

      case "LOGOUT":
          return action.payload; 

          default:
              return state;

    }
    
}


