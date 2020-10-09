



const INITIAL_STATE = {
   
    Authenticated:null,
    loding:true,
    user:null

}



const auThentication = (state = INITIAL_STATE, action) => { ////see this after
    switch (action.type) {

case 'USER_LOADED':
    return{...state,loding:false, Authenticated:action.payload
    }
    case 'LOGOUT_NAVBAR':
    return{...state,loding:false, Authenticated:null
    }
      
        default:
            return state;
    }
};
export default auThentication;

