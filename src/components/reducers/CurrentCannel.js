
const INITIAL_STATE = {
   
    currentCannel:null,
    currentMessege:null

}

const CurrentChannel = (state = INITIAL_STATE, action) => { ////see this after
    switch (action.type) {

case 'SET_CURRENT_CHANNEL':
    return{...state, currentCannel:action.payload
    }
    case 'SET_CURRENT_Message':
    return{...state, currentMessege:action.payload
    }
        default:
            return state;
    }
    
};
export default CurrentChannel;
