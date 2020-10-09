export  const setCurrentchannel =(x)=>dispatch=>{


    dispatch({
        type: 'SET_CURRENT_CHANNEL',
        payload:x
    })

  }
  export  const setCurrentMessage=(x)=>dispatch=>{


    dispatch({
        type: 'SET_CURRENT_Message',
        payload:x
    })

  }
  export  const liveMessage=(x)=>dispatch=>{


    dispatch({
        type: 'SET_CURRENT_Message',
        payload:x
    })

  }